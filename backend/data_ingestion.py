import os
import json
import csv
import pandas as pd
from typing import Dict, Any, List, Optional
import hashlib
from datetime import datetime
import mimetypes
import base64
from io import StringIO, BytesIO

class DataIngestionService:
    """Service for ingesting data in various formats"""
    
    UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "data/uploads")
    MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
    
    def __init__(self):
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)
    
    def ingest_file(
        self,
        file_content: bytes,
        filename: str,
        format: str,
        title: str,
        description: str,
        category: str,
        workflow_categories: List[str] = None,
        tags: List[str] = None,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Ingest a file and extract metadata"""
        
        # Validate file size
        if len(file_content) > self.MAX_FILE_SIZE:
            raise ValueError(f"File size exceeds maximum allowed size of {self.MAX_FILE_SIZE} bytes")
        
        # Generate unique file path
        file_hash = hashlib.md5(file_content).hexdigest()
        file_ext = os.path.splitext(filename)[1]
        stored_filename = f"{file_hash}{file_ext}"
        file_path = os.path.join(self.UPLOAD_DIR, stored_filename)
        
        # Save file
        with open(file_path, 'wb') as f:
            f.write(file_content)
        
        # Extract preview data based on format
        preview_data = self._extract_preview(file_content, format, filename)
        
        # Prepare resource data
        resource_data = {
            'title': title,
            'description': description,
            'format': format,
            'category': category,
            'workflow_categories': workflow_categories or [],
            'tags': tags or [],
            'file_path': file_path,
            'file_size': len(file_content),
            'metadata': metadata or {},
            'preview_data': preview_data,
            'created_at': datetime.now().isoformat(),
            'updated_at': datetime.now().isoformat()
        }
        
        # Add format-specific metadata
        resource_data['metadata'].update(self._extract_metadata(file_content, format, filename))
        
        return resource_data
    
    def _extract_preview(self, file_content: bytes, format: str, filename: str) -> Optional[Dict[str, Any]]:
        """Extract preview data from file"""
        preview = {}
        
        try:
            if format == 'csv':
                # Read first few rows of CSV
                df = pd.read_csv(BytesIO(file_content), nrows=5)
                preview['columns'] = list(df.columns)
                preview['sample_data'] = df.to_dict('records')
                preview['shape'] = {'rows': len(df), 'columns': len(df.columns)}
                
            elif format == 'json':
                # Parse JSON and show structure
                data = json.loads(file_content.decode('utf-8'))
                if isinstance(data, list) and len(data) > 0:
                    preview['sample'] = data[:3]
                    preview['total_items'] = len(data)
                elif isinstance(data, dict):
                    preview['keys'] = list(data.keys())[:10]
                    preview['sample'] = {k: data[k] for k in list(data.keys())[:3]}
                
            elif format == 'excel':
                # Read first sheet
                df = pd.read_excel(BytesIO(file_content), nrows=5)
                preview['columns'] = list(df.columns)
                preview['sample_data'] = df.to_dict('records')
                preview['shape'] = {'rows': len(df), 'columns': len(df.columns)}
                
            elif format in ['text', 'markdown']:
                # Show first few lines
                text = file_content.decode('utf-8', errors='ignore')
                lines = text.split('\n')
                preview['first_lines'] = lines[:10]
                preview['total_lines'] = len(lines)
                preview['total_characters'] = len(text)
                
            elif format == 'pdf':
                # For PDF, just store metadata
                preview['type'] = 'pdf'
                preview['message'] = 'PDF preview not available'
                
            elif format == 'notebook':
                # Parse Jupyter notebook
                notebook = json.loads(file_content.decode('utf-8'))
                preview['cells_count'] = len(notebook.get('cells', []))
                preview['language'] = notebook.get('metadata', {}).get('language_info', {}).get('name', 'python')
                
        except Exception as e:
            preview['error'] = f"Could not extract preview: {str(e)}"
        
        return preview
    
    def _extract_metadata(self, file_content: bytes, format: str, filename: str) -> Dict[str, Any]:
        """Extract format-specific metadata"""
        metadata = {
            'original_filename': filename,
            'mime_type': mimetypes.guess_type(filename)[0]
        }
        
        try:
            if format == 'csv':
                df = pd.read_csv(BytesIO(file_content))
                metadata['rows'] = len(df)
                metadata['columns'] = len(df.columns)
                metadata['column_names'] = list(df.columns)
                metadata['dtypes'] = {col: str(dtype) for col, dtype in df.dtypes.items()}
                
            elif format == 'excel':
                xl = pd.ExcelFile(BytesIO(file_content))
                metadata['sheets'] = xl.sheet_names
                metadata['sheets_count'] = len(xl.sheet_names)
                
            elif format == 'json':
                data = json.loads(file_content.decode('utf-8'))
                metadata['json_type'] = type(data).__name__
                if isinstance(data, list):
                    metadata['items_count'] = len(data)
                elif isinstance(data, dict):
                    metadata['keys_count'] = len(data.keys())
                    
        except Exception as e:
            metadata['extraction_error'] = str(e)
        
        return metadata
    
    @staticmethod
    def validate_format(file_content: bytes, expected_format: str) -> bool:
        """Validate that file content matches expected format"""
        try:
            if expected_format == 'csv':
                pd.read_csv(BytesIO(file_content), nrows=1)
                return True
            elif expected_format == 'json':
                json.loads(file_content.decode('utf-8'))
                return True
            elif expected_format == 'excel':
                pd.read_excel(BytesIO(file_content), nrows=1)
                return True
            elif expected_format in ['text', 'markdown']:
                file_content.decode('utf-8')
                return True
            elif expected_format == 'notebook':
                data = json.loads(file_content.decode('utf-8'))
                return 'cells' in data
            else:
                return True  # For other formats, assume valid
        except:
            return False
    
    @staticmethod
    def process_data_for_learning(
        file_path: str,
        format: str,
        processing_options: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Process data to create learning materials"""
        processing_options = processing_options or {}
        result = {}
        
        try:
            if format == 'csv':
                df = pd.read_csv(file_path)
                
                # Generate statistics
                result['statistics'] = {
                    'shape': df.shape,
                    'columns': list(df.columns),
                    'dtypes': df.dtypes.to_dict(),
                    'missing_values': df.isnull().sum().to_dict(),
                    'numeric_summary': df.describe().to_dict() if not df.select_dtypes(include=['number']).empty else {}
                }
                
                # Generate sample queries
                result['sample_queries'] = [
                    f"df.head()",
                    f"df.info()",
                    f"df.describe()",
                    f"df['{df.columns[0]}'].value_counts()" if len(df.columns) > 0 else ""
                ]
                
                # Suggest visualizations
                numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
                if numeric_cols:
                    result['suggested_visualizations'] = [
                        {'type': 'histogram', 'column': numeric_cols[0]},
                        {'type': 'scatter', 'columns': numeric_cols[:2]} if len(numeric_cols) > 1 else None
                    ]
                
            elif format == 'json':
                with open(file_path, 'r') as f:
                    data = json.load(f)
                
                result['structure'] = DataIngestionService._analyze_json_structure(data)
                result['sample_paths'] = DataIngestionService._get_json_paths(data)[:10]
                
        except Exception as e:
            result['error'] = str(e)
        
        return result
    
    @staticmethod
    def _analyze_json_structure(data: Any, max_depth: int = 3, current_depth: int = 0) -> Dict[str, Any]:
        """Analyze JSON structure recursively"""
        if current_depth >= max_depth:
            return {'type': type(data).__name__, 'truncated': True}
        
        if isinstance(data, dict):
            return {
                'type': 'object',
                'keys': list(data.keys())[:10],
                'sample': {k: DataIngestionService._analyze_json_structure(v, max_depth, current_depth + 1) 
                          for k, v in list(data.items())[:3]}
            }
        elif isinstance(data, list):
            return {
                'type': 'array',
                'length': len(data),
                'sample': DataIngestionService._analyze_json_structure(data[0], max_depth, current_depth + 1) if data else None
            }
        else:
            return {'type': type(data).__name__, 'value': str(data)[:100]}
    
    @staticmethod
    def _get_json_paths(data: Any, path: str = "", paths: List[str] = None) -> List[str]:
        """Get all JSON paths in the data structure"""
        if paths is None:
            paths = []
        
        if isinstance(data, dict):
            for key, value in data.items():
                new_path = f"{path}.{key}" if path else key
                paths.append(new_path)
                DataIngestionService._get_json_paths(value, new_path, paths)
        elif isinstance(data, list) and len(data) > 0:
            new_path = f"{path}[0]"
            paths.append(new_path)
            DataIngestionService._get_json_paths(data[0], new_path, paths)
        
        return paths
    
    async def process_file(
        self, 
        file,  # UploadFile object
        title: str,
        description: str,
        category: str,
        tags: List[str] = None,
        workflow: str = None
    ) -> Dict[str, Any]:
        """Async wrapper for ingest_file method to match API signature"""
        # Read file content
        file_content = await file.read()
        
        # Detect format based on filename or content type
        filename = file.filename
        file_ext = os.path.splitext(filename)[1].lower()
        
        # Map file extensions to formats
        format_map = {
            '.csv': 'csv',
            '.json': 'json',
            '.xlsx': 'excel',
            '.xls': 'excel',
            '.txt': 'text',
            '.md': 'markdown',
            '.pdf': 'pdf',
            '.ipynb': 'notebook',
            '.parquet': 'parquet',
            '.jpg': 'image',
            '.jpeg': 'image',
            '.png': 'image'
        }
        
        detected_format = format_map.get(file_ext, 'text')
        
        # Call the existing ingest_file method
        result = self.ingest_file(
            file_content=file_content,
            filename=filename,
            format=detected_format,
            title=title,
            description=description,
            category=category,
            workflow_categories=[workflow] if workflow else [],
            tags=tags or [],
            metadata={}
        )
        
        return {"resource": result}
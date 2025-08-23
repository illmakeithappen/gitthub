# AWS Setup Guide for gitthub.org

This guide will help you set up AWS RDS (PostgreSQL) and S3 for persistent cloud storage.

## Prerequisites
- AWS Account (requires credit card, but we'll use free tier)
- AWS CLI installed (optional but recommended)

## Step 1: Create AWS RDS PostgreSQL Database

### 1.1 Log into AWS Console
1. Go to https://console.aws.amazon.com
2. Search for "RDS" in the services

### 1.2 Create Database
1. Click "Create database"
2. Choose configuration:
   - **Engine**: PostgreSQL
   - **Version**: Latest (15.x recommended)
   - **Template**: Free tier
   - **DB Instance Identifier**: `gitthub-db`
   - **Master Username**: `gitthubadmin`
   - **Master Password**: (create a strong password)
   - **DB Instance Class**: `db.t3.micro` (free tier)
   - **Storage**: 20 GB SSD (free tier)
   - **Storage Autoscaling**: Disable
   - **Connectivity**: 
     - **Public access**: Yes (for Render to connect)
     - **VPC security group**: Create new
     - **Database port**: 5432

3. Additional Configuration:
   - **Initial database name**: `gitthub`
   - **Backup**: Enable automated backups (7 day retention)
   - **Monitoring**: Disable enhanced monitoring (to stay in free tier)

4. Click "Create database" (takes ~5-10 minutes)

### 1.3 Configure Security Group
1. Once created, click on your database
2. Click on the VPC security group
3. Edit inbound rules:
   - Add rule: PostgreSQL, Source: 0.0.0.0/0 (for development)
   - For production, restrict to Render's IP ranges

### 1.4 Get Connection Details
From the RDS database page, note:
- **Endpoint**: `your-db.region.rds.amazonaws.com`
- **Port**: `5432`
- **Database name**: `gitthub`
- **Username**: `gitthubadmin`

## Step 2: Create S3 Bucket for File Storage

### 2.1 Navigate to S3
1. Search for "S3" in AWS Console
2. Click "Create bucket"

### 2.2 Configure Bucket
1. **Bucket name**: `gitthub-databank` (must be globally unique)
2. **AWS Region**: Choose closest to your users (e.g., `us-west-2`)
3. **Object Ownership**: ACLs enabled
4. **Block Public Access**: Uncheck "Block all public access" (for public files)
   - Acknowledge the warning
5. **Versioning**: Enable (for data protection)
6. **Encryption**: Enable with SSE-S3
7. Click "Create bucket"

### 2.3 Configure Bucket Policy (Optional - for public read)
1. Go to bucket → Permissions → Bucket Policy
2. Add this policy (replace `gitthub-databank` with your bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::gitthub-databank/public/*"
        }
    ]
}
```

### 2.4 Configure CORS (for browser uploads)
1. Go to bucket → Permissions → CORS
2. Add this configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
        "AllowedOrigins": ["https://gitthub.org", "https://www.gitthub.org", "http://localhost:3000"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
```

## Step 3: Create IAM User for Programmatic Access

### 3.1 Navigate to IAM
1. Search for "IAM" in AWS Console
2. Click "Users" → "Add users"

### 3.2 Create User
1. **User name**: `gitthub-app`
2. **Access type**: Programmatic access
3. Click "Next"

### 3.3 Set Permissions
1. Click "Attach existing policies directly"
2. Search and select:
   - `AmazonS3FullAccess` (or create custom policy for specific bucket)
   - `AmazonRDSDataFullAccess` (optional, if using Data API)
3. Click "Next" → "Create user"

### 3.4 Save Credentials
⚠️ **IMPORTANT**: Save these immediately, you won't see them again!
- **Access Key ID**: `AKIA...`
- **Secret Access Key**: `wJal...`

## Step 4: Optional - Set up CloudFront CDN

### 4.1 Create Distribution
1. Go to CloudFront in AWS Console
2. Click "Create distribution"
3. **Origin domain**: Select your S3 bucket
4. **Origin access**: Public
5. **Viewer protocol policy**: Redirect HTTP to HTTPS
6. **Allowed HTTP methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
7. **Cache policy**: CachingOptimized
8. Click "Create distribution"

### 4.2 Get CloudFront Domain
Once created, note the domain: `d1234567890.cloudfront.net`

## Step 5: Configure Environment Variables

Create a `.env` file in your project root:

```env
# AWS RDS PostgreSQL
AWS_RDS_ENDPOINT=your-database.region.rds.amazonaws.com
AWS_RDS_PORT=5432
AWS_RDS_DB_NAME=gitthub
AWS_RDS_USERNAME=gitthubadmin
AWS_RDS_PASSWORD=your-db-password

# AWS S3
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJal...
AWS_REGION=us-west-2
AWS_S3_BUCKET=gitthub-databank

# Optional CloudFront
AWS_S3_CUSTOM_DOMAIN=d1234567890.cloudfront.net

# JWT Secret
JWT_SECRET_KEY=your-secret-key-here
```

## Step 6: Deploy to Render

### 6.1 Add Environment Variables in Render Dashboard
Go to your Render service → Environment:
1. Add all the AWS environment variables from above
2. These will be securely stored and injected at runtime

### 6.2 Deploy
Push your code to GitHub, and Render will automatically deploy with AWS integration!

## Cost Estimation (AWS Free Tier)

### First 12 Months FREE:
- **RDS**: 750 hours/month of db.t3.micro (covers 24/7 running)
- **RDS Storage**: 20 GB SSD storage
- **S3**: 5 GB storage, 20,000 GET requests, 2,000 PUT requests
- **Data Transfer**: 15 GB/month

### After 12 Months:
- **RDS db.t3.micro**: ~$15/month
- **RDS Storage (20GB)**: ~$2.30/month
- **S3 Storage (5GB)**: ~$0.12/month
- **S3 Requests**: ~$0.01/month (for light usage)
- **Total**: ~$18/month

### Tips to Minimize Costs:
1. Stop RDS instance when not in use (during development)
2. Enable S3 lifecycle policies to delete old files
3. Use S3 Intelligent-Tiering for automatic cost optimization
4. Set up billing alerts at $5, $10, $20 thresholds

## Troubleshooting

### RDS Connection Issues
- Ensure security group allows connections from your IP
- Check that database is publicly accessible
- Verify credentials and endpoint

### S3 Upload Issues
- Check IAM user has S3 permissions
- Verify bucket policy allows uploads
- Ensure CORS is configured for browser uploads

### Cost Overruns
- Set up AWS Budgets with alerts
- Use AWS Cost Explorer to track spending
- Enable detailed billing reports

## Migration from Local to AWS

Run the migration script after setting up AWS:

```bash
cd backend
# Test migration first
python migrate_to_aws.py --dry-run

# Run actual migration
python migrate_to_aws.py
```

## Security Best Practices

1. **Never commit AWS credentials to Git**
2. **Use environment variables for all secrets**
3. **Regularly rotate access keys**
4. **Enable MFA on AWS account**
5. **Use least-privilege IAM policies**
6. **Enable RDS encryption**
7. **Enable S3 bucket versioning**
8. **Set up AWS CloudTrail for audit logs**

## Next Steps

1. Test local development with AWS services
2. Deploy to Render with AWS environment variables
3. Set up monitoring with CloudWatch
4. Configure backups and disaster recovery
5. Implement caching with ElastiCache (optional)
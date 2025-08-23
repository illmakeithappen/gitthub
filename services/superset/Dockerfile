# services/superset/Dockerfile
FROM apache/superset:3.0.0

USER root

# Install additional database drivers
RUN pip install --no-cache-dir \
    psycopg2-binary \
    PyAthena \
    clickhouse-driver \
    snowflake-sqlalchemy \
    pymongo \
    redis

# Copy custom configuration
COPY superset_config.py /app/pythonpath/
COPY bootstrap.py /app/pythonpath/
COPY custom_security_manager.py /app/pythonpath/

# Create custom CSS for GitThub branding
COPY static/assets /app/superset/static/assets

# Set environment variables
ENV SUPERSET_CONFIG_PATH=/app/pythonpath/superset_config.py
ENV PYTHONPATH=/app/pythonpath:$PYTHONPATH

USER superset

# Initialize the database
RUN superset db upgrade

# Create default roles and permissions
RUN superset init

EXPOSE 8088

# Health check
HEALTHCHECK CMD ["curl", "-f", "http://localhost:8088/health"]

CMD ["/bin/sh", "-c", "gunicorn --bind 0.0.0.0:8088 --access-logfile '-' --error-logfile '-' --workers 4 --worker-class gevent --timeout 120 'superset.app:create_app()'"]
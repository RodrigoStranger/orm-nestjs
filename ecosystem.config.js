module.exports = {
  apps: [
    {
      name: 'nestjs-orm-app',
      script: 'dist/main.js',
      instances: 'max', // Usar todos los CPUs disponibles
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Configuraciones de PM2
      max_memory_restart: '500M',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      
      // Configuraciones de restart
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Configuraciones de salud
      health_check_grace_period: 3000,
      
      // Variables de entorno específicas
      env_vars: {
        NODE_OPTIONS: '--max-old-space-size=512'
      }
    }
  ],
  
  // Configuración para monitoreo
  deploy: {
    production: {
      user: 'node',
      host: 'localhost',
      ref: 'origin/main',
      repo: 'git@github.com:your-repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
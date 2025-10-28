# 🚀 Production Deployment Guide for cPanel

## 📋 Prerequisites
- ✅ cPanel hosting account with MySQL support
- ✅ Node.js support on your hosting provider
- ✅ SSH access or File Manager

## 🔧 Step 1: Prepare MySQL Database on cPanel

1. **Login to cPanel**
2. **Go to MySQL Databases**
3. **Create new database:**
   - Database name: `sobek_pharma` (or your preferred name)
   - Create a MySQL user with full privileges
   - Note down: database name, username, password

## 📁 Step 2: Upload Files to cPanel

### Option A: Using File Manager
1. Compress the `web` folder as ZIP
2. Upload to your domain's public_html folder
3. Extract the ZIP file

### Option B: Using FTP/SFTP
1. Upload all files from `web` folder to `public_html`

## ⚙️ Step 3: Configure Environment Variables

1. **Create `.env` file in your domain root:**
```env
# Replace with your actual cPanel MySQL credentials
DATABASE_URL="mysql://your_cpanel_user:your_password@localhost:3306/your_database_name"

# Email Configuration
COMPANY_EMAIL=hr@sobekpharma.com
EMAIL_SERVICE=console
EMAIL_FROM=noreply@sobekpharma.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Production Settings
NODE_ENV=production
```

2. **Example for cPanel:**
```env
DATABASE_URL="mysql://cpanel_sobek:mypassword123@localhost:3306/cpanel_sobek_pharma"
```

## 🗄️ Step 4: Setup Database Schema

1. **Using cPanel phpMyAdmin:**
   - Open phpMyAdmin from cPanel
   - Select your database
   - Go to "Import" tab
   - Upload the `mysql_schema.sql` file
   - Click "Go"

2. **Or using command line (if available):**
```bash
mysql -u your_username -p your_database_name < mysql_schema.sql
```

## 📊 Step 5: Import Your Data

1. **Upload the `scripts` folder to your hosting**
2. **Run the import script:**
```bash
cd /path/to/your/website
node scripts/import-to-mysql.js
```

3. **Or manually import using phpMyAdmin:**
   - Use the JSON files in `scripts/backup/` folder
   - Import each table's data manually

## 🔨 Step 6: Build and Install Dependencies

```bash
# Install dependencies
npm install --production

# Build the application
npm run build

# Start the application
npm start
```

## 📝 Step 7: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 3000",
    "production": "NODE_ENV=production npm run build && npm start"
  }
}
```

## 🔍 Step 8: Test Your Deployment

1. **Test database connection:**
   - Visit `/api/categories`
   - Should return JSON data

2. **Test pages:**
   - Homepage: `/`
   - Products: `/products/human-new`
   - Careers: `/careers`
   - Admin: `/admin/login`

3. **Test admin functionality:**
   - Login with admin credentials
   - Check job management
   - Test product creation

## 🚨 Troubleshooting

### Database Connection Issues:
- Verify MySQL credentials in `.env`
- Check if MySQL service is running
- Ensure your hosting supports the MySQL version

### Build Issues:
- Make sure Node.js version is 18+ 
- Check if all dependencies installed correctly
- Verify file permissions

### Import Errors:
- Check MySQL user privileges
- Verify database exists
- Ensure backup files are present

## 📞 Production Support Checklist

- ✅ Database created and configured
- ✅ Environment variables set
- ✅ Schema imported successfully
- ✅ Data migrated from SQLite
- ✅ Application built and running
- ✅ All pages accessible
- ✅ Admin panel working
- ✅ Email notifications configured

## 🔐 Security Notes

1. **Change default admin credentials**
2. **Use strong MySQL passwords**
3. **Enable HTTPS on your domain**
4. **Keep dependencies updated**
5. **Regular database backups**

---

**Need help?** Check the error logs or contact your hosting provider for Node.js configuration assistance.
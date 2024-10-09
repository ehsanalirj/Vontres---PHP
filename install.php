<?php
require_once 'vendor/autoload.php';
use YourNamespace\LicenseService;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $licenseKey = $_POST['license_key'];
    
    // Verify license key
    $isValid = LicenseService::validateMasterLicense($licenseKey);
    
    if ($isValid) {
        // License is valid, proceed with installation
        // Here you would typically:
        // 1. Set up database connection
        // 2. Run database migrations
        // 3. Create initial admin user
        // 4. Set up configuration files
        
        echo "Installation successful!";
    } else {
        echo "Invalid master license key. Please try again.";
    }
} else {
?>
<!DOCTYPE html>
<html>
<head>
    <title>Install Your CRM System</title>
</head>
<body>
    <h1>Install Your CRM System</h1>
    <form method="post">
        <label for="license_key">Master License Key:</label>
        <input type="text" id="license_key" name="license_key" required>
        <button type="submit">Install</button>
    </form>
</body>
</html>
<?php
}
?>
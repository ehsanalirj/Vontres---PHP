<?php
require_once '../vendor/autoload.php';
use YourNamespace\InstallationService;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $installationService = new InstallationService();
    $result = $installationService->install($_POST);
    echo json_encode($result);
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vontres AI Installation</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Vontres AI Installation</h1>
        <div id="installationSteps">
            <!-- Steps will be dynamically inserted here -->
        </div>
    </div>
    <script>
        const steps = [
            {
                title: 'Welcome',
                content: `
                    <p class="mb-4">Welcome to the Vontres AI installation wizard. This process will guide you through setting up your system.</p>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="nextStep()">Start Installation</button>
                `
            },
            {
                title: 'Database Setup',
                content: `
                    <form id="dbForm" class="space-y-4">
                        <div>
                            <label class="block mb-1">Database Host:</label>
                            <input type="text" name="db_host" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div>
                            <label class="block mb-1">Database Name:</label>
                            <input type="text" name="db_name" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div>
                            <label class="block mb-1">Database User:</label>
                            <input type="text" name="db_user" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div>
                            <label class="block mb-1">Database Password:</label>
                            <input type="password" name="db_pass" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Connect Database</button>
                    </form>
                `
            },
            {
                title: 'Admin Account',
                content: `
                    <form id="adminForm" class="space-y-4">
                        <div>
                            <label class="block mb-1">Admin Email:</label>
                            <input type="email" name="admin_email" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <div>
                            <label class="block mb-1">Admin Password:</label>
                            <input type="password" name="admin_password" class="w-full px-3 py-2 border rounded" required>
                        </div>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Create Admin Account</button>
                    </form>
                `
            },
            {
                title: 'Installation Complete',
                content: `
                    <p class="mb-4">Congratulations! Vontres AI has been successfully installed.</p>
                    <a href="/login" class="bg-blue-500 text-white px-4 py-2 rounded inline-block">Go to Login</a>
                `
            }
        ];

        let currentStep = 0;

        function renderStep() {
            const stepContent = `
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl font-bold mb-4">${steps[currentStep].title}</h2>
                    ${steps[currentStep].content}
                </div>
            `;
            document.getElementById('installationSteps').innerHTML = stepContent;

            if (currentStep === 1) {
                document.getElementById('dbForm').addEventListener('submit', handleDbSetup);
            } else if (currentStep === 2) {
                document.getElementById('adminForm').addEventListener('submit', handleAdminSetup);
            }
        }

        function nextStep() {
            currentStep++;
            renderStep();
        }

        async function handleDbSetup(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const response = await fetch('install.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                nextStep();
            } else {
                alert(result.message);
            }
        }

        async function handleAdminSetup(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const response = await fetch('install.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                nextStep();
            } else {
                alert(result.message);
            }
        }

        renderStep();
    </script>
</body>
</html>
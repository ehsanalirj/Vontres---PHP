<?php

namespace YourNamespace;

use YourNamespace\Models\License;

class LicenseService
{
    public static function generateLicense($email, $companyName, $expirationDate)
    {
        $license = new License();
        $license->email = $email;
        $license->companyName = $companyName;
        $license->expirationDate = $expirationDate;
        $license->key = self::generateLicenseKey($email, $companyName, $expirationDate);
        $license->save();

        return $license;
    }

    public static function validateLicense($licenseKey)
    {
        $license = License::where('key', $licenseKey)->first();

        if (!$license) {
            return false;
        }

        if ($license->expirationDate < now()) {
            return false;
        }

        return true;
    }

    private static function generateLicenseKey($email, $companyName, $expirationDate)
    {
        $data = $email . '|' . $companyName . '|' . $expirationDate->format('Y-m-d');
        return hash_hmac('sha256', $data, env('LICENSE_SECRET'));
    }
}
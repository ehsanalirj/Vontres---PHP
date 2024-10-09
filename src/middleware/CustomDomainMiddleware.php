<?php

namespace YourNamespace\Middleware;

use Closure;
use YourNamespace\Models\Company;

class CustomDomainMiddleware
{
    public function handle($request, Closure $next)
    {
        $host = $request->getHost();

        // Check if it's a custom domain
        $company = Company::where('custom_domain', $host)->first();

        if ($company) {
            // Set the company in the request for later use
            $request->merge(['company' => $company]);
        }

        return $next($request);
    }
}
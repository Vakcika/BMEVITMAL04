<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailRequest;
use App\Models\Email;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);
        return Email::paginate($perPage, ['*'], 'page', $page);
    }

    public function create(EmailRequest $request)
    {
        $validated = $request->validated();
        $validated['ip_address'] = $request->ip();
        return Email::create($validated);
    }
}

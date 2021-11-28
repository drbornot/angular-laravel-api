<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $response['status'] = 0;

        if (User::where('email', $request->email)->exists()) {
            $response['message'] = 'The User email already exist!';
            $response['code'] = 409;

            return response()->json($response);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if ($user) {
            $token = $user->createToken('mytoken')->plainTextToken;

            $response['status'] = 1;
            $response['data'] = $user;
            $response['token'] = $token;
            $response['code'] = 200;
        } else {
            $response['message'] = 'Something went wrong!';
            $response['code'] = 404;
        }

        return response()->json($response);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password,$user->password)) {
            $response['status'] = 0;
            $response['message'] = 'Bad creds';
            $response['code'] = 401;
            return response()->json($response);
        }

        $plainTextToken = $user->createToken('mytoken')->plainTextToken;

        $response['status'] = 1;
        $response['data'] = $user;
        $response['usertoken'] = $user->tokens()->first()->token;
        $response['plainTextToken'] = $plainTextToken;
        $response['message'] = 'User Logged successfully!.';
        $response['code'] = 200;

        return response()->json($response);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        $response['status'] = 1;
        $response['message'] = 'User Logged out!';
        $response['code'] = 200;
        return response()->json($response);
    }
}

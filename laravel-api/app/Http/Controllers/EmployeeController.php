<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getEmployees()
    {
        $data = Employee::all();
        if ($data) {
            $response = $this->prepareResponse(1,200, __('Data retrieved'), $data);
        } else {
            $response = $this->prepareResponse(0, 409, __('Data not found'));
        }
        return response()->json($response);
    }

    public function getEmployeeByID($id)
    {
        $model = Employee::find($id);

        if ($model) {
            $response = $this->prepareResponse(1, 200, __('Data retrieved'), $model);
        } else {
            $response = $this->prepareResponse(0, 404, __('Data not found'));
        }
        return response()->json($response);
    }

    public function addEmployee(Request $request)
    {
        $model = Employee::create($request->all());

        if ($model) {
            $response = $this->prepareResponse(1, 200, __('Data have been created successfully!.'), $model);
        } else {
            $response = $this->prepareResponse(0, 409, __('Something went wrong. Please try again.'));
        }
        return response()->json($response);
    }

    public function updateEmployee(Request $request, $id)
    {
        $model = Employee::find($id);

        if ($model) {
            if ($model->update($request->all())) {
                $response = $this->prepareResponse(1,200,__('Data have been updated!.'), $model);
            } else {
                $response = $this->prepareResponse(0, 409, __('Something went wrong. Please try again.'));
            }
        } else {
            $response = $this->prepareResponse(0, 404, __('Data not found'));
        }
        return response()->json($response);
    }

    public function deleteEmployee($id)
    {
        $model = Employee::find($id);

        if ($model) {
            if ($model->delete()) {
                $response = $this->prepareResponse(1, 200, __('Data have been deleted!.'));
            } else {
                $response = $this->prepareResponse(0, 409, __('Something went wrong. Please try again.'));
            }
        } else {
            $response = $this->prepareResponse(0, 404, __('Data not found.'));
        }

        return response()->json($response);
    }

    private function prepareResponse($status = null, $code = null, $message = null, $data = null)
    {
        return [
            'status' => $status,
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ];
    }
}

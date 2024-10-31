<?php

namespace App\Http\Controllers;

use App\Models\AquaPark;
use Illuminate\Http\Request;

class AquaParkController extends Controller
{
    public function index()
    {
        return AquaPark::all();
    }

    public function show($id)
    {
        return AquaPark::findOrFail($id);
    }

    public function store(Request $request)
    {
        $aquaPark = AquaPark::create($request->all());
        return response()->json($aquaPark, 201);
    }

    public function update(Request $request, $id)
    {
        $aquaPark = AquaPark::findOrFail($id);
        $aquaPark->update($request->all());
        return response()->json($aquaPark, 200);
    }

    public function destroy($id)
    {
        AquaPark::destroy($id);
        return response()->json(null, 204);
    }
}

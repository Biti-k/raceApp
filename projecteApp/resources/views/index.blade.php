<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config("app.name") }}</title>
    <link rel="shortcut icon" href="{{ asset('icon.svg') }}" /> {{-- https://yesicon.app/maki/racetrack --}}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    @viteReactRefresh
    @vite('resources/react/app.jsx')
    <script>
        const get_all_categories = "{{route("categories.get_all_categories")}}";
        const get_all_esports = "{{route("esports.get_all_esports")}}";
        const get_all_curses = "{{route("curses.get_all_curses")}}";
        const store_cursa = "{{route("curses.store_cursa")}}";

    </script>
    <style>
        html{
            height: 100%;
        }
        body{
            height: 100%;
        }
    </style>
    
</head>
<body>
<div id="app"></div>
</body>
</html>
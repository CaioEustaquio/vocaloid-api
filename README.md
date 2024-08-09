# Vocaloid API
A API of vocaloids data.

## Summary

- [Overview](#overview)
- [Intall](#install)
- [Config](#config)
- [Use](#use)
- [Project Layers](#project-layers)
- [Licence](#licence)

## Overview

The vocaloid API is a service with the porpouse of serve vocaloids, songs and producers data.

## Install

To install the project dependencies, execute:

```bash
npm install
```

## Config

Copy file .env.example to .env.production and config environment vars as needed.

## Use

Run the server

```bash
npm run dev
```

## Project Layers

**Controllers**

The controllers handle the HTTP requests and interact with the use cases. They are responsible by receive the requests, call appropriated use cases and return responses.

**Models**

The models represents the objects of business and them rules. They are mongoose structure of data that represents the mongodb collections.

## Licence

This project its licenced by MIT licence.

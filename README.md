# Nextcloud 3D Viewer

This is a Nextcloud app that allows users to view 3D models directly within their Nextcloud instance. The app leverages the Three.js library for rendering 3D graphics in the browser.

## Features

- View various 3D model formats.
- Interactive 3D model manipulation (rotate, zoom, pan).
- Simple and intuitive user interface.

## Installation

1. Clone the repository to your Nextcloud apps directory:
   ```
   git clone https://github.com/maz1987in/3dviewer.git
   ```

2. Enable the app in Nextcloud:
   - Go to the Nextcloud app management page.
   - Find "3D Viewer" in the list and enable it.

3. Ensure that the required dependencies are installed. You can manage dependencies using Composer:
   ```
   composer install
   ```

## Usage

- After installation, navigate to the 3D Viewer app from your Nextcloud dashboard.
- Upload your 3D model files (supported formats include .obj, .stl, etc.).
- Select a model to view it in the 3D viewer.

## Development

To contribute to the project, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Ensure that your code adheres to the project's coding standards.
- Submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
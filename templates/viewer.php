<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Model Viewer</title>
    <link rel="stylesheet" href="<?php echo $this->baseUrl(); ?>/css/viewer.css">
    <script src="<?php echo $this->baseUrl(); ?>/js/three.min.js"></script>
    <script src="<?php echo $this->baseUrl(); ?>/js/viewer.js"></script>
</head>
<body>
    <div id="viewer-app">
        <h1>3D Model Viewer</h1>
        <div id="loading"><?php p($l->t('Loading 3D model...')); ?></div>
        <canvas id="3d-canvas"></canvas>
        <div id="controls">
            <button id="reset-view"><?php p($l->t('Reset View')); ?></button>
            <button id="wireframe-toggle"><?php p($l->t('Toggle Wireframe')); ?></button>
            <div id="info">
                <span id="model-name"></span>
            </div>
        </div>
    </div>
    <script>
        // Initialize the viewer with the model data
        document.addEventListener('DOMContentLoaded', function() {
            const modelData = <?php echo json_encode($modelData); ?>;
            initViewer(modelData);
        });

        window.fileId = <?php echo $_['fileId']; ?>;
    </script>
</body>
</html>
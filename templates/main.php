<?php
script('3dviewer', 'main');
style('3dviewer', 'main');
?>

<div id="app">
    <div id="app-navigation">
        <h2><?php p($l->t('3D Models')); ?></h2>
        <div id="file-list">
            <!-- File list will be populated by JavaScript -->
        </div>
    </div>
    <div id="app-content">
        <div id="welcome-message">
            <h3><?php p($l->t('Welcome to 3D Viewer')); ?></h3>
            <p><?php p($l->t('Select a 3D model file from the navigation to view it here.')); ?></p>
        </div>
        <div id="viewer-container" style="display: none;">
            <canvas id="3d-canvas"></canvas>
            <div id="controls">
                <button id="reset-view"><?php p($l->t('Reset View')); ?></button>
                <button id="wireframe-toggle"><?php p($l->t('Toggle Wireframe')); ?></button>
            </div>
        </div>
    </div>
</div>
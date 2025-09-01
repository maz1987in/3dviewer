<?php
namespace OCA\ThreeDViewer\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Controller;

class PageController extends Controller {
    public function __construct(string $appName, IRequest $request) {
        parent::__construct($appName, $request);
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function index(): TemplateResponse {
        return new TemplateResponse('3dviewer', 'main');
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function view(int $fileId): TemplateResponse {
        return new TemplateResponse('3dviewer', 'viewer', ['fileId' => $fileId]);
    }
}
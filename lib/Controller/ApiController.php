<?php
namespace OCA\ThreeDViewer\Controller;

use OCP\IRequest;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\DataResponse;
use OCP\Files\IRootFolder;
use OCP\IUserSession;

class ApiController extends Controller {
    private $rootFolder;
    private $userSession;

    public function __construct(string $appName, IRequest $request, IRootFolder $rootFolder, IUserSession $userSession) {
        parent::__construct($appName, $request);
        $this->rootFolder = $rootFolder;
        $this->userSession = $userSession;
    }

    /**
     * @NoAdminRequired
     */
    public function getModel(int $fileId): DataResponse {
        try {
            $user = $this->userSession->getUser();
            if (!$user) {
                return new DataResponse(['error' => 'User not found'], 404);
            }

            $userFolder = $this->rootFolder->getUserFolder($user->getUID());
            $files = $userFolder->getById($fileId);
            
            if (empty($files)) {
                return new DataResponse(['error' => 'File not found'], 404);
            }

            $file = $files[0];
            $content = $file->getContent();
            $mimeType = $file->getMimeType();
            
            return new DataResponse([
                'content' => base64_encode($content),
                'mimeType' => $mimeType,
                'name' => $file->getName()
            ]);
        } catch (\Exception $e) {
            return new DataResponse(['error' => $e->getMessage()], 500);
        }
    }
}
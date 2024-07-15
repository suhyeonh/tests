<?php

declare(strict_types=1);

namespace GovCMS\Tests\Security\Functional;

use GovCMS\Tests\Baseline\Functional\GovCMSTestBase;

class NodeAddFormTest extends GovCMSTestBase {

    protected static $modules = ['user', 'node', 'govcms_security'];

    protected function setUp(): void {
        parent::setUp();

        $user = $this->drupalCreateUser([
            'administer content types',
            'administer nodes',
            'bypass node access',
        ]);
        $this->drupalLogin($user);

    }

    public function testAuthorInfoHidden(): void {
        $typeName = 'testcontenttype';
        $nodeName = 'testnode';
        // Create new content type
        $this->drupalGet('admin/structure/types/add');
        $edit = [
            'name' => $typeName,
            'type' => $typeName,
        ];
        $this->submitForm($edit, 'Save and manage fields');
        $this->assertSession()->responseContains('has been added.');
        // Create new node with this type
        $this->drupalGet("node/add/$typeName");
        $this->assertSession()->statusCodeEquals(200);
        $edit = [
            'title[0][value]' => $nodeName,
        ];
        $this->submitForm($edit, 'Save');
        // Confirm authoring information is not displayed
        $this->assertSession()->responseContains('has been created.');
        $this->assertSession()->elementNotExists('css', '.node__meta');
        $this->assertSession()->elementExists('css', '.node__content');
    }
}

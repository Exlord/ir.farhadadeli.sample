<?php
// This file declares an Angular module which can be autoloaded
// in CiviCRM. See also:
// http://wiki.civicrm.org/confluence/display/CRMDOC/hook_civicrm_angularModules

return array(
    'js' =>
        array(
            0 => 'ang/shared/datatables/angular-datatables.min.js',//this should be moved to a central location
            1 => 'ang/sample.js',
            2 => 'ang/sample/*.js',
            3 => 'ang/sample/*/*.js',
        ),
    'css' =>
        array(
            0 => 'ang/shared/datatables/angular-datatables.min.css',//this should be moved to a central location
            1 => 'ang/sample.css',
        ),
    'partials' =>
        array(
            0 => 'ang/sample',
        ),
    'settings' =>
        array(),
);
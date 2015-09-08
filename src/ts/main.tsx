/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="../tsd/tsd.d.ts" />
/// <reference path="definitions/jquery.d.ts" />

import * as cu from 'cu-core';
import * as React from 'react';
import $ from 'jquery';
import FpsHud from './fps/FpsHud';
import VfxHud from './vfx/VfxHud';
import NetHud from './net/NetHud';
import PhysHud from './phys/PhysHud';

React.render(
  <FpsHud pollInterval={10} />,
  document.getElementById('hud-fps')
);

React.render(
  <VfxHud pollInterval={500} />,
  document.getElementById('hud-vfx-container')
);

React.render(
  <NetHud pollInterval={10} />,
  document.getElementById('hud-net-container')
);

React.render(
  <PhysHud pollInterval={10} />,
  document.getElementById('hud-phys-container')
);

const hudMaximize = $('#hud-maximize');
const hudMinimize = $('#hud-minimize');
const hudContent = $('#hud-content');
const hudContainer = $('#hud-container');

hudMaximize.hide();

hudMinimize.on('mousedown', function() {
  hudMinimize.hide();
  hudContent
    .slideUp(200, function() {
      hudContainer.animate({
        width: '135px'
      }, 100, function() {
        hudMaximize.show();
      });
    });
});

hudMaximize.on('mousedown', function() {
  hudMaximize.hide();
  hudContainer.animate({
    width: '310px'
  }, 100, function() {
    hudContent
      .slideDown(200, function() {
        hudMinimize.show();
      });
  });
});

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
import Select from './select/Select';
import FpsHud from './fps/FpsHud';
import RenderHud from './render/RenderHud';
import NetworkHud from './network/NetworkHud';
import PhysicsHud from './physics/PhysicsHud';

const LS_KEY_MINIMIZED = 'perfhud__minimized';
const WIDTH_MINIMIZED = '135px';
const WIDTH_MAXIMIZED = '310px';

cu.client.OnInitialized(() => {

  const hudMaximize = $('#hud-maximize');
  const hudMinimize = $('#hud-minimize');
  const hudContent = $('#hud-content');
  const hudContainer = $('#hud-container');

  function minimize() {
    hudMinimize.hide();
    hudContent
      .slideUp(200, function() {
        hudContainer.animate({
          width: WIDTH_MINIMIZED
        }, 100, function() {
          hudMaximize.show();
          localStorage.setItem(LS_KEY_MINIMIZED, '1');
        });
      });
  }

  function maximize() {
    hudMaximize.hide();
    hudContainer.animate({
      width: WIDTH_MAXIMIZED
    }, 100, function() {
      hudContent
        .slideDown(200, function() {
          hudMinimize.show();
          localStorage.setItem(LS_KEY_MINIMIZED, '0');
        });
    });
  }

  if (parseInt(localStorage.getItem(LS_KEY_MINIMIZED)) === 1) {
    hudMaximize.show();
    hudMinimize.hide();
    minimize();
  } else {
    hudMaximize.hide();
    hudMinimize.show();
  }

  hudMinimize.on('mousedown', minimize);
  hudMaximize.on('mousedown', maximize);

  React.render(
    <Select />,
    document.getElementById('hud-select')
  );

  React.render(
    <FpsHud pollInterval={10} />,
    document.getElementById('hud-fps')
  );

  React.render(
    <RenderHud pollInterval={500} />,
    document.getElementById('hud-render-container')
  );

  React.render(
    <NetworkHud pollInterval={10} />,
    document.getElementById('hud-network-container')
  );

  React.render(
    <PhysicsHud pollInterval={10} />,
    document.getElementById('hud-physics-container')
  );

  setTimeout(() => {
    hudContainer.show();
  }, 300);

});

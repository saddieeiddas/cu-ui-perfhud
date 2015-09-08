/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';
import $ from 'jquery';
import PerfhudParser from './PerfhudParser';

export class VfxHudProps {
  pollInterval: number = 500;
}

export default class VfxHud extends React.Component<VfxHudProps, PerfhudParser> {

  constructor(props: VfxHudProps) {
    super(props);
    this.state = VfxHud.buildState();
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  static buildState(): PerfhudParser {
    const parser = new PerfhudParser();
    parser.parse(cu.client.perfHUD);
    return parser;
  }

  tick() {
    this.setState(VfxHud.buildState());
  }

  render() {
    return (
      <div id="hud-vfx">
        <div className="hud-vfx-grid-header">{this.state.average.header}</div>
        <div className="hud-vfx-grid-container" dangerouslySetInnerHTML={this.state.average.grid}></div>
        <div className="hud-vfx-grid-footer">{this.state.average.footer}</div>
        <div className="hud-vfx-grid-header">{this.state.longest.header}</div>
        <div className="hud-vfx-grid-container" dangerouslySetInnerHTML={this.state.longest.grid}></div>
        <div className="hud-vfx-grid-footer">{this.state.longest.footer}</div>
        <div className="hud-vfx-table" dangerouslySetInnerHTML={this.state.table}></div>
        <div className="hud-vfx-errors">
          {this.state.errors.map(function(error, i) {
            return <div className="hud-vfx-error">{error}</div>;
          }) }
        </div>
      </div>
    );
  }
}

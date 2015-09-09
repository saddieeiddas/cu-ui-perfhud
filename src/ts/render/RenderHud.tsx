/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';
import $ from 'jquery';
import PerfhudParser from './PerfhudParser';

export class RenderHudProps {
  pollInterval: number = 500;
}

export default class RenderHud extends React.Component<RenderHudProps, PerfhudParser> {

  constructor(props: RenderHudProps) {
    super(props);
    this.state = RenderHud.buildState();
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  static buildState(): PerfhudParser {
    const parser = new PerfhudParser();
    parser.parse(cu.client.perfHUD);
    return parser;
  }

  tick() {
    this.setState(RenderHud.buildState());
  }

  render() {
    return (
      <div id="hud-render">
        <div className="hud-render-grid-header">{this.state.average.header}</div>
        <div className="hud-render-grid-container" dangerouslySetInnerHTML={this.state.average.grid}></div>
        <div className="hud-render-grid-footer">{this.state.average.footer}</div>
        <div className="hud-render-grid-header">{this.state.longest.header}</div>
        <div className="hud-render-grid-container" dangerouslySetInnerHTML={this.state.longest.grid}></div>
        <div className="hud-render-grid-footer">{this.state.longest.footer}</div>
        <div className="hud-render-table" dangerouslySetInnerHTML={this.state.table}></div>
        <div className="hud-render-errors">
          {this.state.errors.map(function(error: string, i: number) {
            return <div key={i} className="hud-render-error">{error}</div>;
          }) }
        </div>
      </div>
    );
  }
}

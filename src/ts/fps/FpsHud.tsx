/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';

export class FpsHudProps {
  pollInterval: number = 10;
}

export default class FpsHud extends React.Component<FpsHudProps, any> {

  constructor(props: FpsHudProps) {
    super(props);
    this.state = { fps: cu.client.fps.toFixed(0) };
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  tick() {
    this.setState({ fps: cu.client.fps.toFixed(0) });
  }

  render() {
    return (
      <div><span>{this.state.fps}</span>{' '}<small>fps</small></div>
    );
  }
}

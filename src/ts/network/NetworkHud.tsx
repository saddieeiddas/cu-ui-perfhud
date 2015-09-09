/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';

export class NetworkHudProps {
  pollInterval: number = 10;
}

export class NetworkHudState {
  public stats: NetworkHudStat[];
}

export class NetworkHudStat {
  public label: string;
  public value: any;
  public error: boolean;

  constructor(label: string, value: any, error: boolean) {
    this.label = label;
    this.value = value;
    this.error = error;
  }

  public errorClass(): string {
    return this.error ? 'error' : '';
  }
}

export default class NetworkHud extends React.Component<NetworkHudProps, NetworkHudState> {

  constructor(props: NetworkHudProps) {
    super(props);
    this.state = this.buildState();
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  buildState(): NetworkHudState {
    const stats: NetworkHudStat[] = [];
    stats.push(new NetworkHudStat('latency (msec)', (cu.client.netstats_lag || 0.000).toFixed(1), cu.client.netstats_lag > 250));
    stats.push(new NetworkHudStat('time delta (msec)', (cu.client.netstats_delay || 0.000).toFixed(1), Math.abs(cu.client.netstats_delay) > 250));
    stats.push(new NetworkHudStat('tcp messages / s', (cu.client.netstats_tcpMessages || 0.000).toFixed(1), false));
    stats.push(new NetworkHudStat('tcp bytes / s', (cu.client.netstats_tcpBytes || 0.000).toFixed(1), false));
    stats.push(new NetworkHudStat('udp packets / s', (cu.client.netstats_udpPackets || 0.000).toFixed(1), cu.client.netstats_udpPackets == 0));
    stats.push(new NetworkHudStat('udp bytes / s', (cu.client.netstats_udpBytes || 0.000).toFixed(1), false));
    stats.push(new NetworkHudStat('self updates / s', (cu.client.netstats_selfUpdatesPerSec || 0.000).toFixed(1), cu.client.netstats_selfUpdatesPerSec < 0.25));
    stats.push(new NetworkHudStat('syncs / s', (cu.client.netstats_syncsPerSec || 0.000).toFixed(1), cu.client.netstats_syncsPerSec > 0.0));
    return {
      stats: stats
    };
  }

  tick() {
    this.setState(this.buildState());
  }

  render() {
    return (
      <div id="hud-network">
        <table>
          <tbody>
            {this.state.stats.map((stat: NetworkHudStat, i: number) => {
              return (
                <tr key={i}>
                  <td>{stat.label}</td>
                  <td className={stat.errorClass() } dangerouslySetInnerHTML={{ __html: stat.value }}></td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';

export class NetHudProps {
  pollInterval: number = 10;
}

export class NetHudState {
  public stats: NetHudStat[];
}

export class NetHudStat {
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

export default class NetHud extends React.Component<NetHudProps, NetHudState> {

  constructor(props: NetHudProps) {
    super(props);
    this.state = this.buildState();
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  buildState(): NetHudState {
    const stats: NetHudStat[] = [];
    stats.push(new NetHudStat('latency (msec)', (cu.client.netstats_lag || 0.000).toFixed(1), cu.client.netstats_lag > 250));
    stats.push(new NetHudStat('time delta (msec)', (cu.client.netstats_delay || 0.000).toFixed(1), Math.abs(cu.client.netstats_delay) > 250));
    stats.push(new NetHudStat('tcp messages / s', (cu.client.netstats_tcpMessages || 0.000).toFixed(1), false));
    stats.push(new NetHudStat('tcp bytes / s', (cu.client.netstats_tcpBytes || 0.000).toFixed(1), false));
    stats.push(new NetHudStat('udp packets / s', (cu.client.netstats_udpPackets || 0.000).toFixed(1), cu.client.netstats_udpPackets == 0));
    stats.push(new NetHudStat('udp bytes / s', (cu.client.netstats_udpBytes || 0.000).toFixed(1), false));
    stats.push(new NetHudStat('self updates / s', (cu.client.netstats_selfUpdatesPerSec || 0.000).toFixed(1), cu.client.netstats_selfUpdatesPerSec < 0.25));
    stats.push(new NetHudStat('syncs / s', (cu.client.netstats_syncsPerSec || 0.000).toFixed(1), cu.client.netstats_syncsPerSec > 0.0));
    return {
      stats: stats
    };
  }

  tick() {
    this.setState(this.buildState());
  }

  render() {
    return (
      <div id="hud-net">
        <table>
          <tbody>
            {this.state.stats.map((stat: NetHudStat, i: number) => {
              return (
                <tr>
                  <td>{stat.label}</td>
                  <td className={stat.errorClass() }>{stat.value}</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

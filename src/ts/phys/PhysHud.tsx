/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';

export class PhysHudProps {
  pollInterval:number = 10;
}

export class PhysHudState {
  public stats: PhysHudStat[];
}

export class PhysHudStat {
  public label: string;
  public value: any;
  public error: boolean;

  constructor(label:string, value:any, error:boolean) {
    this.label = label;
    this.value = value;
    this.error = error;
  }

  public errorClass():string {
    return this.error ? 'error' : '';
  }
}

export default class PhysHud extends React.Component<PhysHudProps, PhysHudState> {

  constructor(props:PhysHudProps) {
    super(props);
    this.state = this.buildState();
    setInterval(this.tick.bind(this), props.pollInterval);
  }

  buildState(): PhysHudState {
    const stats: PhysHudStat[] = [];
    stats.push(new PhysHudStat('position', '('+(cu.client.locationX || 0.000).toFixed(1) + ', ' + (cu.client.locationY || 0.0).toFixed(1) + ', ' + (cu.client.locationZ || 0.0).toFixed(1) + ')', false));
    stats.push(new PhysHudStat('serverPosition', '(' + (cu.client.serverLocationX || 0.0).toFixed(1) + ', ' + (cu.client.serverLocationY || 0.0).toFixed(1) + ', ' + (cu.client.serverLocationZ || 0.0).toFixed(1) + ')', false));
    stats.push(new PhysHudStat('horizontalVel', (cu.client.horizontalSpeed || 0.000).toFixed(1) + ' m/s @ ' + (cu.client.velFacing || 0).toFixed(0) + '&#176;', false));
    stats.push(new PhysHudStat('downAngle', (cu.client.downCollisionAngle || 0.000).toFixed(1) + '&#176;', false));
    stats.push(new PhysHudStat('terrainAngle', (cu.client.terrainCollisionAngle || 0.000).toFixed(1) + '&#176;', false));
    return {
      stats: stats
    };
  }

  tick() {
    this.setState(this.buildState());
  }

  render() {
    return (
      <div id="hud-phys">
        <table>
          <tbody>
          {this.state.stats.map(function(stat:PhysHudStat, i: number){
            return (
              <tr>
                <td>{stat.label}</td>
                <td className={stat.errorClass()} dangerouslySetInnerHTML={{__html: stat.value}}></td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

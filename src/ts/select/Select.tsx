/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as cu from 'cu-core';
import * as React from 'react';
import ClassNames from 'classnames';

export const LS_KEY_ACTIVE_HUD = 'perfhud__active_hud';

export class SelectProps {
}

export class SelectState {
  active: Hud = null;
  open: boolean = false;
  huds: Hud[] = [
    new Hud('hud-render-container', 'Render'),
    new Hud('hud-network-container', 'Network'),
    new Hud('hud-physics-container', 'Physics')
  ];

  constructor() {
    const activeHud = localStorage.getItem(LS_KEY_ACTIVE_HUD);
    if (activeHud) {
      if (this.hudExists(activeHud)) {
        this.active = this.getHud(activeHud);
      } else {
        localStorage.removeItem(LS_KEY_ACTIVE_HUD);
      }
    }
    if (!this.active) {
      this.active = this.huds[0];
    }
    this.huds.map((hud: Hud) => {
      const hudElement = document.getElementById(hud.id);
      hudElement.style.display = 'none';
    });
    const activeHudElement = document.getElementById(this.active.id);
    activeHudElement.style.removeProperty('display');
  }

  public hudExists(id: string) {
    return this.huds.filter((hud: Hud) => {
      return hud.id === id;
    }).length > 0;
  }

  public getHud(id: string) {
    return this.huds.filter((hud: Hud) => {
      return hud.id === id;
    })[0];
  }
}

export class Hud {
  id: string;
  label: string;
  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }
}

export default class Select extends React.Component<SelectProps, SelectState> {

  constructor(props: SelectProps) {
    super(props);
    this.state = new SelectState();
    console.log(this.state);
  }

  toggleOpen = () => {
    this.state.open = !this.state.open;
    this.setState(this.state);
  }

  makeActive = (hud: Hud, event: React.MouseEvent) => {
      const existingHud = document.getElementById(this.state.active.id);
      existingHud.style.display = 'none';
      this.state.active = hud;
      const newHud = document.getElementById(this.state.active.id);
      newHud.style.removeProperty('display');
      this.state.open = false;
      localStorage.setItem(LS_KEY_ACTIVE_HUD, this.state.active.id);
      this.setState(this.state);
  }

  render() {
    return (
      <div className={ClassNames('hud-select', {'hud-select-open': this.state.open})}>
        <div className="hud-select-active" onMouseDown={this.toggleOpen}>
          {this.state.active.label}
        </div>
        <div className="hud-select-options">
          {this.state.huds.map((hud: Hud) => {
            return (
              <div key={hud.id} className="hud-select-option" onMouseDown={this.makeActive.bind(this, hud)}>{hud.label}</div>
            );
          })}
        </div>
      </div>
    );
  }
}

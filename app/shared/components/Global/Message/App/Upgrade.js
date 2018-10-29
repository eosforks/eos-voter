// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Icon, Modal, Segment } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class GlobalMessageAppUpgrade extends Component<Props> {
  checkForUpdates = () => {
    ipcRenderer.send('checkForUpdates');
  }
  skipUpdate = () => {
    const {
      actions,
      constants
    } = this.props;
    actions.setSetting('upgradeSkip', constants.version);
  }
  render() {
    const {
      constants,
      t,
    } = this.props;
    return (
      <Modal
        open
        size="small"
      >
        <Modal.Content>
          <Segment basic size="large" textAlign="center">
            <Header color="blue" icon size="large">
              <Icon name="info circle" />
              <Header.Content>
                {t('global_app_requires_upgrade_header', { new: constants.version })}
                <Header.Subheader>
                  {t('global_app_requires_upgrade_subheader')}
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
          <Form>
            <Form.TextArea
              rows={6}
              value={constants.versioninfo[constants.version]}
            />
          </Form>
          <Segment basic size="large" textAlign="center">
            <p>
              <Button
                content="Upgrade"
                color="blue"
                icon="up arrow"
                onClick={this.checkForUpdates}
                size="large"
              />
            </p>
            <p>
              <Button
                content="Skip this Version"
                color="grey"
                onClick={this.skipUpdate}
              />
            </p>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('global')(GlobalMessageAppUpgrade);
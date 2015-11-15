import React from 'react';
import {Dialog, TextField, SelectField} from 'material-ui';
import {SendButton} from './widgets';

export default class SendForm extends React.Component {
  render() {

    let sendFormAssets = [
      {payload: 0, text: 'XLM'},
      {payload: 1, text: 'USD/GCDSRTDSFRSD...'},
      {payload: 1, text: 'JPY/onecred.org'},
    ];

    let sendFormActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: () => {console.log("beep")} }
    ];

    return <div>
      <SendButton onClick={() => this.refs.sendForm.show()} />
      <Dialog title="Send Money" ref="sendForm" actions={sendFormActions}>
        <TextField hintText="Recipient" />
        <TextField hintText="Amount" />
        <SelectField
          value={null}
          hintText="Asset"
          menuItems={sendFormAssets} />
      </Dialog>
    </div>;
  }
}



# Installation

with npm
```
npm install --save lit-share-modal
```

with yarn
```
yarn add lit-share-modal
```

# Usage

with React Hooks

```
import { ShareModal } from 'lit-share-modal';
import 'lit-share-modal/dist/style.css'
import { useState } from 'react';
import './App.css'

const App = () => {
  const [openShareModal, setOpenShareModal] = useState(false);

  const onAccessControlConditionsSelected = (shareModalOutput) => {
    // do things with share modal output
  }

  return (
    <div className={'App'}>
      <ShareModal onClose={() => setOpenShareModal(false)}
                  showModal={openShareModal}
                  onAccessControlConditionsSelected={onAccessControlConditionsSelected} />
    </div>

  );
}

export default App;

```

# Props

### Required

- `onClose` - actions to take on closing the modal 
- `showModal` - boolean that signals whether modal is open (true) or closed (false)
- `onAccessControlConditionsSelected` - function to send the share modal output 

### Optional

- `defaultTokens` - set quick access tokens that appear in the `Select a Token/NFT` menu

Three tokens/NFTs appear as default: `Ethereum`, `LitGate`, and `Blocks`

This list can be altered by passing an array of objects with the following properties:

- `label` - name of token/NFT
- `logo` - url of token/NFT favicon
- `value` - token/NFT address
- `symbol` - token/NFT symbol
- `standard` - token standard (ERC20, ERC721, or ERC1155)

**Example of a single entry quick access array**
```
export const defaultTokens = [
  {
    label: "Lit Genesis Gate",
    logo: "https://litgateway.com/favicon.png",
    value: "0xA3D109E28589D2AbC15991B57Ce5ca461Ad8e026",
    symbol: "LITGATE",
    standard: "ERC721",
  }
];
```

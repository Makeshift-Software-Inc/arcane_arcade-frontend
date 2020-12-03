import React from 'react';
import { observer } from 'mobx-react';
import Input from '../../../../components/Form/Input/Input';

const SupportedPlatform = ({ platform, selected, onChange }) => (
  <label
    className={`flex-row align-center cursor-pointer ${
      selected ? 'checked' : ''
    }`}
  >
    <Input
      className="checkbox"
      type="checkbox"
      name={platform.name}
      data-id={platform.id}
      onChange={onChange}
      checked={selected}
    />
    {platform.name}
  </label>
);

const SupportedPlatforms = ({ options, platforms, onChange }) => options.map((platform) => {
  const selected = !!platforms.find((p) => p.id === platform.id);
  return (
    <React.Fragment key={platform.id}>
      <SupportedPlatform
        platform={platform}
        selected={selected}
        onChange={onChange}
      />
      {platform.children.length > 0 && (
      <div className="child-platforms flex-column align-start">
        {selected
              && platform.children.map((children) => (
                <SupportedPlatform
                  key={children.id}
                  platform={children}
                  selected={!!platforms.find((p) => p.id === children.id)}
                  onChange={onChange}
                />
              ))}
      </div>
      )}
    </React.Fragment>
  );
});

export default observer(SupportedPlatforms);

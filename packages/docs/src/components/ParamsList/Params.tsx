import React from 'react';
import ParamsItem from './ParamsItem';
import ParamsList from './ParamsList';

export interface ParamsListItemData {
  name: string;
  type: string;
  isHidden?: boolean;
  description?: string | React.ReactNode;
  typeHref?: string;
  required?: boolean;
  children?: ParamsListItemData[];
}

const renderParamsListItems = (data: ParamsListItemData) => {
  if (!data.children?.length) return <ParamsItem key={data.name} {...data} />;

  const { children, ...details } = data;
  return (
    <ParamsItem key={details.name} {...details}>
      {children.map((d) => renderParamsListItems(d))}
    </ParamsItem>
  );
};

interface Props {
  data: ParamsListItemData[];
}
const Resource = ({ data }: Props) => {
  return <ParamsList>{data.map((d) => renderParamsListItems(d))}</ParamsList>;
};

export default Resource;

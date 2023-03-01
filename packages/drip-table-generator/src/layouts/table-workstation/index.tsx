/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { drawerWidth } from '@/utils/enum';
import { GeneratorContext } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps } from '@/typing';

import EditableTableFooter from './editable-footer';
import EditableTableHeader from './editable-header';
import EditableTable from './editable-table';
import PreviewTable from './table-preview';

const TableWorkStation = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const tableWrapper = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="jfe-drip-table-generator-workstation-generator-workstation"
      style={{
        overflow: context.mode === 'edit' ? void 0 : 'hidden',
        width: context.drawerType ? `calc(100% - 128px - ${drawerWidth[context.drawerType]}px)` : void 0,
      }}
      ref={tableWrapper}
    >
      { context.mode === 'edit'
        ? (
          <React.Fragment>
            <EditableTableHeader slots={props.slots} ext={props.ext} />
            <EditableTable
              customComponentPanel={props.customComponentPanel}
              customComponents={props.customComponents}
              mockDataSource={props.mockDataSource}
              dataFields={props.dataFields}
              onDropComponent={() => {
                setTimeout(() => {
                  const scrollWidth = tableWrapper.current?.scrollWidth || 0;
                  tableWrapper.current?.scroll({ left: scrollWidth });
                }, 100);
              }}
            />
            <EditableTableFooter slots={props.slots} ext={props.ext} />
          </React.Fragment>
        )
        : <PreviewTable visible={context.mode === 'preview'} {...props} /> }
    </div>
  );
};

export default TableWorkStation;

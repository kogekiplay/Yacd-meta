import cx from 'clsx';
import { formatDistance, Locale } from 'date-fns';
import { enUS, zhCN, zhTW } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useSortBy, useTable } from 'react-table';

import prettyBytes from '../misc/pretty-bytes';
import s from './ConnectionTable.module.scss';

function renderCell(cell: { column: { id: string }; value: number }, locale: Locale) {
  switch (cell.column.id) {
    case 'start':
      return formatDistance(cell.value, 0, { locale: locale });
    case 'download':
    case 'upload':
      return prettyBytes(cell.value);
    case 'downloadSpeedCurr':
    case 'uploadSpeedCurr':
      return prettyBytes(cell.value) + '/s';
    default:
      return cell.value;
  }
}

const sortById = { id: 'id', desc: true };

function Table({ data, columns, hiddenColumns }) {
  const tableState = {
    sortBy: [
      // maintain a more stable order
      sortById,
    ],
    hiddenColumns,
  };
  const table = useTable(
    {
      columns,
      data,
      initialState: tableState,
      autoResetSortBy: false,
    },
    useSortBy
  );

  const { getTableProps, setHiddenColumns, headerGroups, rows, prepareRow } = table;

  useEffect(() => {
    setHiddenColumns(hiddenColumns);
  }, [setHiddenColumns, hiddenColumns]);
  const { t, i18n } = useTranslation();

  let locale: Locale;

  if (i18n.language === 'zh-CN') {
    locale = zhCN;
  } else if (i18n.language === 'zh-TW') {
    locale = zhTW;
  } else {
    locale = enUS;
  }

  return (
    <div style={{ marginTop: '5px' }}>
      <table {...getTableProps()} className={s.table}>
        <thead>
          {headerGroups.map((headerGroup, trindex) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()} className={s.tr} key={trindex}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className={s.th}>
                    <span>{t(column.render('Header'))}</span>
                    <span className={s.sortIconContainer}>
                      {column.isSorted ? (
                        <ChevronDown size={16} className={column.isSortedDesc ? '' : s.rotate180} />
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className={s.tr} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cx(
                        s.td,
                        i % 2 === 0 ? s.odd : false,
                        j == 0 || (j >= 5 && j < 10) ? s.center : true
                        // j ==1 ? s.break : true
                      )}
                    >
                      {renderCell(cell, locale)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

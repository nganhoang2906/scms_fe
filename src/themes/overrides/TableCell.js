export default function TableCell(theme) {
  const commonCell = {
    '&:not(:last-of-type)': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        backgroundColor: theme.palette.divider,
        width: 1,
        height: 'calc(100% - 30px)',
        right: 0,
        top: 16
      }
    }
  };

  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: 12,
          borderColor: theme.palette.divider,
          '&.cell-right': {
            justifyContent: 'flex-end',
            textAlign: 'right',
            '& > *': {
              justifyContent: 'flex-end',
              margin: '0 0 0 auto'
            },
            '& .MuiOutlinedInput-input': {
              textAlign: 'right'
            }
          },
          '&.cell-center': {
            justifyContent: 'center',
            textAlign: 'center',
            '& > *': {
              justifyContent: 'center',
              margin: '0 auto'
            }
          }
        },
        sizeSmall: {
          padding: 8
        },
        head: {
          fontWeight: 700,
          ...commonCell
        },
        footer: {
          ...commonCell
        }
      }
    }
  };
}

import styled from 'react-emotion'
import { css } from 'emotion'

const baseListStyles = [
  ({ theme }) => ({
    marginTop: 0,
    marginBottom: theme.spacing.l,
    marginLeft: theme.spacing.xxxxl,
    padding: 0,
    p: {
      display: 'inline'
    },
    'ul, ol': {
      marginLeft: theme.spacing.xxxxl,
      padding: 0
    }
  }),
  css`
    ul {
      list-style-type: circle;
      list-style-position: inside;
    }
  `
]

export const Ul = styled('ul')(
  ...baseListStyles,
  css`
    list-style-type: disc;
  `
)

export const Ol = styled('ol')(...baseListStyles)

/* global graphql */

import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import facepaint from 'facepaint'

import { breakpoints } from '../styles/variables'
import { textContainer } from '../styles/mixins'
import MetaTags from '../components/MetaTags'
import Markdown from '../components/Markdown'
import ContentfulPicture from '../components/ContentfulPicture'
import PublishDate from '../components/PublishDate'
import GroupedTags from '../components/GroupedTags'
import {
  Anchor,
  Paragraph,
  Ul,
  Ol,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Strong,
  Em,
  Blockquote,
  Table,
  Thead,
  Th,
  Td,
  HorizontalRule
} from '../components/Elements'

const Container = styled('div')({
  width: '100%',
  overflow: 'hidden'
})

const mq = facepaint([
  `@media(min-width: ${breakpoints.m}px)`,
  `@media(min-width: ${breakpoints.l}px)`
])

const Article = styled('article')(
  {
    margin: '0 auto'
  },
  textContainer,
  ({ theme }) =>
    mq({
      width: [`calc(100% - ${theme.spacing.xxxxl})`, '90%', '90%'],
      maxWidth: [null, null, '750px']
    })
)

const CodeBackground = styled('div')(
  {
    backgroundColor: '#282c34',
    overflowX: 'auto'
  },
  ({ theme }) =>
    mq({
      width: [
        `100vw`,
        `100vw`,
        `calc(100% + ${theme.spacing.xxxxl} + ${theme.spacing.xxxxl})`
      ],
      padding: [
        `${theme.spacing.xl} calc(${theme.spacing.xxxxl} / 2)`,
        `${theme.spacing.xl} 5vw`,
        `${theme.spacing.xl} ${theme.spacing.xxxxl}`
      ],
      margin: [
        `${theme.spacing.xl} calc(-${theme.spacing.xxxxl} / 2)`,
        `${theme.spacing.xl} -5vw`,
        `${theme.spacing.xxxl} -${theme.spacing.xxxxl}`
      ],
      borderRadius: [null, null, theme.radius.l]
    })
)

const Figure = styled('figure')(({ theme }) =>
  mq({
    margin: [
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xl} 0`,
      `${theme.spacing.xxxl} 0`
    ]
  })
)
const FigureCaption = styled('figcaption')(({ theme }) => ({
  display: 'block',
  width: '100%',
  color: theme.colors.greyHeavy,
  textAlign: 'center',
  fontSize: theme.fontSize.xs,
  lineHeight: theme.lineHeight.m,
  fontFamily: theme.fonts.sansSerif.family
}))

const Picture = styled(ContentfulPicture)([
  {
    overflow: 'hidden'
  },
  ({ theme }) =>
    mq({
      margin: [
        `0 calc(-${theme.spacing.xxxxl} / 2)`,
        `0 -5vw`,
        `0 -${theme.spacing.xxxxl}`
      ],
      width: [
        '100vw',
        '100vw',
        `calc(100% + ${theme.spacing.xxxxl} + ${theme.spacing.xxxxl})`
      ],
      borderRadius: [null, null, theme.radius.l]
    })
])

const FigureImage = ({ alt, ...props }) => (
  <Figure>
    <Picture {...{ alt, ...props }} />
    <FigureCaption>{alt}</FigureCaption>
  </Figure>
)
FigureImage.propTypes = {
  alt: PropTypes.string
}
FigureImage.displayName = 'Figure'
FigureImage.defaultProps = { alt: undefined }

const Summary = styled('p')(({ theme }) =>
  mq({
    fontFamily: theme.fonts.sansSerif.family,
    fontWeight: theme.fonts.sansSerif.weights.light,
    lineHeight: theme.lineHeight.m,
    fontSize: theme.fontSize.xxl,
    margin: `calc(2 * ${theme.spacing.xl}) 0`
  })
)

const BlockquoteStyles = ({ theme }) => ({
  '*': {
    fontFamily: theme.fonts.sansSerif.family
  },
  li: {
    fontSize: theme.fontSize.m,
    fontWeight: theme.fonts.sansSerif.weights.regular
  }
})

const p = ({ children, ...props }) => {
  const firstChild = children[0]
  const isFigure = get('type.name', firstChild) === 'Figure'
  if (isFigure) {
    return <FigureImage {...firstChild.props} />
  }

  return <Paragraph {...props}>{children}</Paragraph>
}

p.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const Pre = styled('pre')(({ theme }) => ({
  lineHeight: 1.2,
  fontSize: theme.fontSize.xs
}))

const pre = props => (
  <CodeBackground>
    <Pre {...props} />
  </CodeBackground>
)

const tableFontstyles = ({ theme }) => ({
  fontFamily: theme.fonts.sansSerif.family,
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fonts.sansSerif.weights.light
})

const remarkReactComponents = {
  pre,
  p,
  a: Anchor,
  img: FigureImage,
  ul: Ul,
  ol: Ol,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  strong: Strong,
  em: Em,
  blockquote: styled(Blockquote)(BlockquoteStyles),
  table: styled(Table)(tableFontstyles),
  th: Th,
  td: Td,
  thead: Thead,
  hr: HorizontalRule
}

const BlogPostH1 = remarkReactComponents.h1

const GroupedTagsWrapper = styled('div')(({ theme }) => ({
  margin: `calc(2 * ${theme.spacing.xl}) 0`
}))

const PostPublishDate = styled(PublishDate)(({ theme }) => ({
  display: 'block',
  fontFamily: theme.fonts.sansSerif.family,
  fontWeight: theme.fonts.sansSerif.weights.light,
  marginBottom: theme.spacing.s
}))

const BlogPost = ({ data: { contentfulBlogPost, site } }) => {
  const {
    title,
    publishDate,
    body: { body },
    summary,
    category,
    tags
  } = contentfulBlogPost
  const { author } = site.siteMetadata

  return (
    <Container>
      <MetaTags {...{ title, description: summary, author, type: 'article' }} />
      <Article>
        <PostPublishDate date={publishDate} />
        <BlogPostH1>{title}</BlogPostH1>
        <Summary>{summary}</Summary>
        <Markdown remarkReactComponents={remarkReactComponents} text={body} />
        <GroupedTagsWrapper>
          <GroupedTags category={category} tags={tags} />
        </GroupedTagsWrapper>
      </Article>
    </Container>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    contentfulBlogPost: PropTypes.shape({
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      body: PropTypes.shape({ body: PropTypes.string.isRequired }).isRequired,
      publishDate: PropTypes.string.isRequired
    })
  })
}

export default BlogPost

export const query = graphql`
  query BlogPostQuery($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      body {
        body
      }
      tags
      category {
        name
        identifier
      }
      summary
      publishDate
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

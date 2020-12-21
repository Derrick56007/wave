import * as Fluent from '@fluentui/react'
import React from 'react'
import { S, B } from './qd'
import { displayMixin } from './theme'
import { Markdown } from './markdown'
import { stylesheet } from 'typestyle'

/**
 * Create a message bar.
 *
 * A message bar is an area at the top of a primary view that displays relevant status information.
 * You can use a message bar to tell the user about a situation that does not require their immediate attention and
 * therefore does not need to block other activities.
 */
export interface MessageBar {
  /** The icon and color of the message bar. */
  type?: 'info' | 'error' | 'warning' | 'success' | 'danger' | 'blocked'
  /** The text displayed on the message bar. */
  text?: S
  /** An identifying name for this component. */
  name?: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
}

const
  css = stylesheet({
    messageBar: {
      $nest: {
        // Adjust spacing to align with Fluent Messagebar icon.
        '.wave-markdown > *:first-child': { marginTop: 0 },
        '.wave-markdown > *:only-child': { marginBottom: 0 },
      }
    }
  }),
  toMessageBarType = (t?: S): Fluent.MessageBarType => {
    switch (t) {
      case 'error': return Fluent.MessageBarType.error
      case 'warning': return Fluent.MessageBarType.warning
      case 'success': return Fluent.MessageBarType.success
      case 'danger': return Fluent.MessageBarType.severeWarning
      case 'blocked': return Fluent.MessageBarType.blocked
      default: return Fluent.MessageBarType.info
    }
  }

export const
  XMessageBar = ({ model: m }: { model: MessageBar }) => (
    m.text?.length
      ? (
        <Fluent.MessageBar
          data-test={m.name}
          style={displayMixin(m.visible)}
          messageBarType={toMessageBarType(m.type)}
          className={css.messageBar}
        >
          <Markdown source={m.text} />
        </Fluent.MessageBar>
      )
      : <div />
  )
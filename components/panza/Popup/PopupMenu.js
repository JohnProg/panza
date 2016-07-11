import React, { PropTypes } from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import {
  Popup,
  Text,
  Base
} from '../index'

/**
 * Render a PopupMenu option
 */

const PopupMenuOption = ({
  opt
}) => {


  if (React.isValidElement(opt)) {
    return opt
  }

  return (
    <Base
      py={2}
      px={2}
      underlayColor='#eee'
      backgroundColor='white'
      Component={TouchableHighlight}
      onPress={opt.onPress}
      style={{
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#aaa'
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <Text bold numberOfLines={1} textAlign='center' color='primary'>
          {opt.label}
        </Text>
      </View>
    </Base>
  )
}

PopupMenuOption.propTypes = {
  opt: PropTypes.shape({
    onPress: PropTypes.func.isRequired,
    label: PropTypes.func.isRequired
  })
}

/**
 * PopupMenu provides similar functionality to Apple's
 * ActionSheet, but is more flexible, and cross-platform compatibile.
 * @composes Popup
 */

class PopupMenu extends React.Component {

  static displayName = 'PopupMenu'

  static propTypes = {
    children: PropTypes.any.isRequired,
    showing: PropTypes.bool.isRequired,
    Content: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onRequestShow: PropTypes.func,
    options: PropTypes.array.isRequired,
    showCancel: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.oneOf(['bottom', 'center', 'top'])
  }

  static defaultProps = {
    showing: false,
    position: 'bottom'
  }

  render() {

    const {
      position,
      children,
      options,
      title,
      description,
      showCancel,
      onRequestClose,
      ...other
    } = this.props

    const optionEls = options.map((opt, i) => (
      <PopupMenuOption opt={opt} key={opt.key || i} />
    ))

    if (showCancel) {
      optionEls.push(
        <PopupMenuOption
          opt={{
            isCancel: true,
            label: 'Cancel',
            value: 'cancel',
            onPress: () => onRequestClose()
          }}
          key='cancel'
        />
      )
    }

    const opts = (
      <Base>
        {(title || description) && (
          <Base backgroundColor='transparent' py={1} px={2} align='center'>
            {title && <Text bold color='white'>{title}</Text>}
            {description && <Text color='white' small>{description}</Text>}
          </Base>
        )}
        <Base style={{ overflow: 'hidden' }}>
          {optionEls}
        </Base>
      </Base>
    )

    return (
      <Popup
        Content={opts}
        position={position}
        onRequestClose={onRequestClose}
        backgroundColor='black'
        {...other}
      >
        {children}
      </Popup>
    )
  }
}

export default PopupMenu

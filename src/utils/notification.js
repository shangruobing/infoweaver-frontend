import { ElNotification } from 'element-plus'
import { h } from 'vue'

const Notification = (text, type = 'warning', duration = 2000) => {
  ElNotification({
    message: h('i', { style: 'color: teal' }, text),
    position: 'top-right',
    type: type,
    duration: duration
  })
}

export default Notification

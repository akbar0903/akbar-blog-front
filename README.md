# akbar-blog-front
vue3,element-plus个人博客项目前端。



## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 颜色
项目中用到的颜色都是从tailwindcss中获取的，具体颜色可以参考tailwindcss的文档。
## 主要颜色

- `--my-prymary-color: #409eff;`(element-plus：--el-color-primary)
- `--my-success-color: #22c55e;`（tailwindcss：green-500）
- `--my-danger-color: #ef4444;`（tailwindcss：red-500）
- `--my-warning-color: #f97316;`（tailwindcss：orange-500）
- `--my-menu-text-color: #64748b;`(tailwindcss：zinc-500)
- `--my-overlay-color: rgba(0,0,0,0.5);`(element-plus：--el-overlay-color-lighter)

## 深色模式
- `--my-base-dark-bg-color: #09090b;`(tailwindcss：zinc-950)
- `--my-secodary-dark-bg-color: #18181b;`(tailwindcss：zinc-900)
- `--my-message-dark-bg-color: #1f1f1f;`
- `--my-base-dark-border-color: #3f3f46;`(tailwindcss：zinc-700)
- `--my-message-dark-border-color: #ebeef5;`
- `--my-base-dark-text-color: #27272a;`(tailwindcss：zinc-800)
- `--my-base-dark-text-color: white;`

## 阴影
- `--my-base-box-shadow: 0 3px 4px #0000001a,
  0 24px 36px #0000000a;`(页面中主要用到的阴影样式)
- `--my-inset-box-shadow: inset 0 3px 4px #0000001a;`

## 边框
- `--my-message-border: 1px solid var(--my-message-dark-border-color)`

# 请求拦截器
请求拦截器写在request.js中。

```js
import axios from 'axios'
import { useAdminStore } from '@/stores'
import { ElNotification } from 'element-plus'

/**
 * axios 请求拦截器
 *
 */

//定义axios示例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

//请求拦截
instance.interceptors.request.use((config) => {
  const adminStore = useAdminStore()

  if (adminStore.token) {
    config.headers.Authorization = adminStore.token
  }
  return config
})

//响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    return Promise.reject(response.data)
  },

  //错误响应
  (error) => {
    if (error.response) {
      const { status } = error.response
      const messageMap = {
        401: '认证失败，请重新登录！',
        403: '没有权限！',
        404: '请求的资源不存在！',
        500: '服务器错误！',
      }
      const message = messageMap[status] || '未知错误！'

      // 判断是否重复通知
      if (!error.isHandled) {
        ElNotification({
          title: '错误',
          message,
          type: 'error',
          duration: 3000,
        })
        error.isHandled = true // 标记已处理
      } else if (error.request) {
        ElNotification({
          title: '网络错误',
          message: '网络请求超时！',
          type: 'error',
          duration: 3000,
        })
      } else {
        ElNotification({
          title: '配置错误',
          message: '请求配置错误！',
          type: 'error',
          duration: 3000,
        })
      }
      return Promise.reject(error)
    }
  },
)

export default instance

```
## 请求拦截
请求拦截这个很简单，就是在请求头中添加token。

## 响应拦截
响应拦截这个就比较复杂了。
- 首先判断是前后端通的情况下的逻辑：
```js
 (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    return Promise.reject(response.data)
  }
```
如果是成功的响应（code等于0），则直接返回数据。
如果是失败的响应（code不等于0，换句话说是1），则返回一个Promise.reject(response.data)，这样就会触发catch方法。
所以说，我们可以在try catch里面处理成功状态和失败状态的逻辑。
不再去判断code等于几了。<br/>
<mark>
下面是我之前写的这个代码太冗余了，不推荐。
</mark>
```js
 if (result.code === 0) {
      ElNotification({
        title: '成功',
        message: '密码更新成功！',
        type: 'success',
        duration: 3000,
      })
      const adminStore = useAdminStore()
      adminStore.removeToken()
      adminStore.setAdmin({})
      document.documentElement.classList.remove('dark')
      location.reload() // 刷新页面
    } else {
      ElNotification({
        title: '错误',
        message: result.message || '密码更新失败',
        type: 'error',
        duration: 3000,
      })
    }
```
不用判断code等于几，因为try里面是处理成功状态的逻辑，catch里面是处理失败状态的逻辑。

# 头像上传
管理员头像上传模块我使用了头像历史列表，把以前使用过的头像都存起来，当想换头像的时候，可以使用以前使用过的头像或者上传新的头像。
```js
// 获取头像列表
const avatarHistory = ref([])
const loadAvatarHistory = async () => {
  try {
    const result = await adminGetAvatarListService(params.value)
    avatarHistory.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  }
}

const adminStore = useAdminStore()
const avatarUrl = ref(adminStore.admin.avatar)
const selectedFile = ref(null)
const isHistoryAvatar = ref(false) // 是否是历史头像

// 预览头像
const onSelectFile = (uploadFile) => {
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  selectedFile.value = uploadFile.raw // Save the selected file
  isHistoryAvatar.value = false // 选择本地头像时，默认不是历史头像
  drawerVisible.value = false
}

// 选择历史头像
const selectHistoryAvatar = (historyAvatarUrl) => {
  avatarUrl.value = historyAvatarUrl
  selectedFile.value = null
  isHistoryAvatar.value = true // 选择的是历史头像
  drawerVisible.value = false
}

// 修改头像
const uploadAvatar = async () => {
  if (avatarUrl.value === adminStore.admin.avatar) {
    // 如果没有选择新的头像
    ElMessage.warning('请选择一个新的头像！')
    return
  }

  try {
    let updatedAvatarUrl = avatarUrl.value
    if (!isHistoryAvatar.value && selectedFile.value) {
      const uploadResult = await fileUploadService(selectedFile.value)
      updatedAvatarUrl = uploadResult.data
    }
    await adminUpdateAvatarService({ avatar: updatedAvatarUrl })
    adminStore.admin.avatar = updatedAvatarUrl
    avatarUrl.value = updatedAvatarUrl
    ElMessage.success('头像修改成功！')
  } catch (error) {
    ElMessage.error('头像更新失败！' + error.message)
  }
}
```
`avatarUrl`用来在页面展示当前正在使用的头像。<br/>
`selectedFile`用来保存选择的本地头像文件。<br/>
`isHistoryAvatar`用来判断是否是历史头像。<br/>
`onSelectFile`用来处理选择本地头像的逻辑。<br/>
`selectHistoryAvatar`用来处理选择历史头像的逻辑。<br/>
`uploadAvatar`用来处理上传头像的逻辑。<br/>
当选择历史头像的时候，让`selectedFile.value = null`。<br/>
当执行`uploadAvatar`的时候，如果没有选择新的头像，则提示用户选择一个新的头像。<br/>
比如：`avatarUrl.value === adminStore.admin.avatar`，这里的avatarUrl从头像列表中选择得来的头像，如果从头像列表中选择的头像等于pinia中的头像，就进行提示。<br/>
<br/>
然后是头像上传或者修改用户头像的逻辑:<br/>
```js
try {
  let updatedAvatarUrl = avatarUrl.value
  if (!isHistoryAvatar.value && selectedFile.value) {
    const uploadResult = await fileUploadService(selectedFile.value)
    updatedAvatarUrl = uploadResult.data
  }
  await adminUpdateAvatarService({ avatar: updatedAvatarUrl })
  adminStore.admin.avatar = updatedAvatarUrl
  avatarUrl.value = updatedAvatarUrl
  ElMessage.success('头像修改成功！')
} catch (error) {
  ElMessage.error('头像更新失败！' + error.message)
}
```
`updatedAvatarUrl `是后端返回的头像地址，首先判断当前头像是不是从头像列表中选择的，如果不是再判断是不是从本地选择了新的头像。
如果符合这两个条件，就进行上传头像操作。<br/>
头像上传完后，拿着刚才后端返回的上传头像地址，修改用户的头像。<br/>
并且修改pinia中的头像地址。<br/>
因为有没有选择新的头像是通过`avatarUrl.value === adminStore.admin.avatar`来判断的。<br/>
所以，修改完用户头像以后，需要`avatarUrl.value `要跟pinia中的头像地址一样进行修改，以便判断用户是不是选择了新的头像。<br/>

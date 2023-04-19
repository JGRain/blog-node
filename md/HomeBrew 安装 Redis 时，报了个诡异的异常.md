## 问题

> 今天使用 HomeBrew 安装 Redis 时，报了个诡异的异常:

```shell
fatal: not in a git directory
Error: Command failed with exit 128: git
复制代码
```

> 原因是 HomeBrew 的组件 `homebrew-core` 和 `homebrew-cask` 没有被识别为 Git 仓库

## 解决方式

> 打开 Terminal，输入： `brew -v` ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aecf851faff841909e5712fd05a45b07~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?) 执行上图红线中的 git 命令，就可以了。 最后用 `brew -v` 看下结果，如下图所示。 ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5bed99f4cbb4fd2af041dd43a67f1eb~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image?)

## 另一种情况

> 极个别情况下，使用 `--add safe.directory` 也没有，那你可以将相关目录移除、然后重新添加，命令示例如下：

```shell
rm -rf /opt/homebrew/Library/Taps/homebrew/homebrew-core
brew tap homebrew/core
rm -rf /opt/homebrew/Library/Taps/homebrew/homebrew-cask
brew tap homebrew/cask
复制代码
```

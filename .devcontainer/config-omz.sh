#/bin/bash

direnv allow
sed -i '/plugins=(git)/c\plugins=(git direnv zsh-autosuggestions zsh-syntax-highlighting)' ~/.zshrc
sed -i '/ZSH_THEME="devcontainers"/c\ZSH_THEME="miloshadzic"' ~/.zshrc
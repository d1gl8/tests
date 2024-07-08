<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

const mock = {
  status: [
    {
      text: 'Статус 1',
      value: 'status 1'
    },
    {
      text: 'Статус 2',
      value: 'status 2'
    },
    {
      text: 'Статус 3',
      value: 'status 3'
    }
  ],
  citizenship: [
    {
      text: 'Гражданство 1',
      value: 'citizenship 1'
    },
    {
      text: 'Гражданство 2',
      value: 'citizenship 2'
    },
    {
      text: 'Гражданство 3',
      value: 'citizenship 3'
    },
    {
      text: 'Гражданство 4',
      value: 'citizenship 4'
    }
  ],
  relocate: [
    {
      text: 'Да',
      value: 'yes'
    },
    {
      text: 'Нет',
      value: 'no'
    }
  ]
}

interface InputFileEvent extends Event {
  target: HTMLInputElement
}
const readFile = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsDataURL(file)
  })
}
const loadFile = async (e: InputFileEvent, drop = false) => {
  return await readFile(!drop ? e.target.files?.[0] : e.dataTransfer.files[0])
}

const avatarFile = ref('')
const dateBirth = ref('')

const onSubmit = ({ target }) => {
  const formData = new FormData(target)
  console.log('FormData', Array.from(formData.entries()))
}
</script>

<template>
  <form @submit.prevent="onSubmit($event)">
    <header>
      <p>Основная информация</p>
      <p>
        <span>Шаг 1</span>
        <input type="range" value="1" step="1" min="0" max="8" />
        <span>из 8</span>
      </p>
    </header>

    <Avatar class="avatar">
      <AvatarImage :src="avatarFile" alt="avatar" />
      <AvatarFallback class="avatar--fallback">АБ</AvatarFallback>
    </Avatar>

    <div
      class="input-file"
      @drag.prevent
      @dragenter.prevent
      @dragover.prevent
      @drop.prevent="
        async ($event) => {
          avatarFile = await loadFile($event, true)
        }
      "
    >
      <span class="label">Перетащите или выберите фото на компьютере</span>
      <label for="avatar">
        <div class="button">
          <span class="icon" />
          Выбрать файл
        </div>
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          @input="
            async ($event) => {
              avatarFile = await loadFile($event)
            }
          "
        />
      </label>
    </div>

    <div class="flex w-full gap-x-[16px]">
      <div class="input-text w-[50%]">
        <input id="surname" name="surname" type="text" required />
        <label for="surname">Фамилия</label>
      </div>
      <div class="input-text w-[50%]">
        <input id="name" name="name" type="text" required />
        <label for="name">Имя</label>
      </div>
    </div>

    <div class="flex flex-col-reverse w-full">
      <Select name="status" required>
        <SelectTrigger class="form-field">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="({ text, value }, idx) in mock.status"
            :key="value + idx"
            :value="value"
          >
            {{ text }}
          </SelectItem>
        </SelectContent>
      </Select>
      <label>Статус</label>
    </div>

    <Popover>
      <PopoverTrigger as-child>
        <div class="input-text w-full">
          <input id="date-birth" name="date-birth" type="text" required v-model="dateBirth" />
          <label for="date-birth">Дата рождения</label>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar v-model="dateBirth" initial-focus />
      </PopoverContent>
    </Popover>

    <div class="flex flex-col-reverse w-full">
      <Select name="citizenship" required>
        <SelectTrigger class="form-field">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="({ text, value }, idx) in mock.citizenship"
            :key="value + idx"
            :value="value"
          >
            {{ text }}
          </SelectItem>
        </SelectContent>
      </Select>
      <label>Гражданство</label>
    </div>

    <div class="flex flex-col-reverse w-full">
      <Select name="relocate" required>
        <SelectTrigger class="form-field">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="({ text, value }, idx) in mock.relocate"
            :key="value + idx"
            :value="value"
          >
            {{ text }}
          </SelectItem>
        </SelectContent>
      </Select>
      <label>Готовность приехать</label>
    </div>

    <button class="next" type="submit">Следующий шаг →</button>
  </form>
</template>

<style lang="scss">
form {
  display: grid;
  place-items: center;
  row-gap: 16px;

  header {
    width: calc(100% + 48px);
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray-1);
    padding: 0 24px 24px;
    margin-bottom: 24px;
    p {
      font-weight: 700;
      display: flex;
      align-items: center;
    }
    input[type='range'] {
      -webkit-appearance: none;
      appearance: none;
      width: 240px;
      height: 5px;
      border-radius: 5px;
      overflow: hidden;
      margin: 0 8px;
      pointer-events: none;
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 5px;
        height: 5px;
        background: #309d5b;
        border-radius: 50%;
        box-shadow: -240px 0 0 240px #309d5b;
      }
      &::-webkit-slider-runnable-track {
        background: rgba(#40fb48, 0.7);
      }
    }
  }

  .form-field {
    width: 100%;
    height: 40px;
    font-size: 16px;
    border: 1px solid var(--gray-1);
    border-radius: 6px;
    box-shadow: unset;
    padding: 0 14px;
  }

  label {
    display: block;
    font-size: 14px;
    color: var(--gray-3);
    margin-bottom: 4px;
  }

  *:required + label {
    &::after {
      content: '*';
      width: 16px;
      color: red;
      margin-left: 4px;
    }
  }

  .input-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--gray-3);
    font-weight: 400;
    padding: 14px 34px;
    border: 1px dashed var(--gray-1);
    border-radius: 8px;

    span.label {
      display: block;
      margin-bottom: 16px;
    }
    label {
      cursor: pointer;
      .icon {
        position: relative;
        width: 32px;
        height: 32px;
        background-color: #4b465c14;
        border-radius: 6px;
        margin-right: 14px;
        &::before {
          content: url('/icons/upload-file.svg');
          width: 21px;
          height: 20px;
          position: absolute;
          left: 6px;
          top: 6px;
        }
      }
      .button {
        pointer-events: none;
        display: flex;
        align-items: center;
        color: var(--orange);
        padding: 0;
        &:hover {
          color: var(--orange);
          // color: unset;
          background-color: unset;
        }
      }
      input {
        display: none;
      }
    }
  }

  .input-text {
    display: flex;
    flex-direction: column-reverse;

    input {
      @extend .form-field;
    }
  }

  button.next {
    width: max-content;
    color: white;
    background-color: var(--orange);
    border-radius: 4px;
    padding: 16px 20px;
    margin-left: auto;
    margin-top: 8px;
  }
}
</style>

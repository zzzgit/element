import { t } from 'jade-ui/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};

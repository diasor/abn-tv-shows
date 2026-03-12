import { config } from '@vue/test-utils';
import { beforeEach, vi } from 'vitest';
import { defineComponent, h } from 'vue';

export const routerPushMock = vi.fn();
export const routerReplaceMock = vi.fn();

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof import('vue-router')>('vue-router');

  return {
    ...actual,
    useRouter: () => ({
      push: routerPushMock,
      replace: routerReplaceMock,
    }),
    useRoute: () => ({
      path: '/',
      fullPath: '/',
      params: {},
      query: {},
      hash: '',
      name: undefined,
      matched: [],
      meta: {},
    }),
  };
});

const RouterLinkStub = defineComponent({
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      required: false,
      default: '/',
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const href = typeof props.to === 'string' ? props.to : '/';

    const navigate = (event?: Event) => {
      event?.preventDefault?.();
      routerPushMock(href);
    };

    return () => {
      if (props.custom && slots.default) {
        return slots.default({
          href,
          navigate,
          route: { path: href },
        });
      }

      return h('a', { href, onClick: navigate }, slots.default?.());
    };
  },
});

beforeEach(() => {
  routerPushMock.mockReset();
  routerReplaceMock.mockReset();
});

config.global.directives = {
  ...(config.global.directives ?? {}),
  ripple: {
    mounted: () => {
      // no-op directive for unit tests
    },
    updated: () => {
      // no-op directive for unit tests
    },
  },
};

config.global.stubs = {
  ...(config.global.stubs ?? {}),
  RouterLink: RouterLinkStub,
  RouterView: true,
};

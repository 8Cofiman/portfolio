import { useMemo, useState } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Collapse,
  ConfigProvider,
  Descriptions,
  Divider,
  Drawer,
  Flex,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Modal,
  Progress,
  Rate,
  Result,
  Row,
  Segmented,
  Space,
  Statistic,
  Steps,
  Tabs,
  Tag,
  Timeline,
  Tooltip,
  Typography,
  notification,
  message,
  theme,
} from 'antd'
import {
  ApartmentOutlined,
  BulbOutlined,
  CoffeeOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FireOutlined,
  FundOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './App.css'
import avatarUser from './assets/images/me.jpg'

const { Header, Sider, Content, Footer } = Layout
const { Title, Text, Paragraph } = Typography

type MenuKey = 'profile' | 'experience' | 'skills' | 'contact'

function App() {
  const [selected, setSelected] = useState<MenuKey>('profile')
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hireModalOpen, setHireModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [msgApi, msgContextHolder] = message.useMessage()
  const { token } = theme.useToken()

  const menuItems = useMemo(
    () => [
      { key: 'profile', icon: <UserOutlined />, label: 'Профиль' },
      { key: 'experience', icon: <ApartmentOutlined />, label: 'Опыт' },
      { key: 'skills', icon: <ToolOutlined />, label: 'Навыки' },
      { key: 'contact', icon: <CustomerServiceOutlined />, label: 'Контакты' },
    ],
    [],
  )

  const headline = 'Fullstack разработчик'
  const subline =
    'Работал над различным кейсами, есть опыт в различных направления. Постойнно саморазвиваюсь.'
  const bestBadge = (
    <Badge
      count="самый лучший (по версии мамы)"
      style={{
        backgroundColor: token.colorSuccess,
        boxShadow: `0 0 0 1px ${token.colorSuccessBorder} inset`,
      }}
    />
  )

  const openHire = () => {
    setHireModalOpen(true)
    msgApi.info('Открываю форму')
  }

  const openDrawer = () => {
    setDrawerOpen(true)
    api.info({
      message: 'Портфолио открыто',
      description: 'Тут всё строго: сертификаты, отзывы и “до/после” (без реальных кейсов, зато с гордостью).',
      placement: 'topRight',
    })
  }

  const onSubmitContact = async (values: {
    name: string
    phone: string
    task: string
    urgency: string
    scope: string
    comment?: string
  }) => {
    setSubmitted(true)

    api.success({
      message: 'Заявка принята',
      description:
        `Имя: ${values.name}. Телефон: ${values.phone}. ` +
        `Задача: ${values.task}. Срочность: ${values.urgency}. Объём: ${values.scope}.`,
      placement: 'topRight',
      icon: <ThunderboltOutlined />,
    })

    msgApi.success('Отлично! Сейчас “включу мозг” и “выключу автомат” — в правильном порядке.')
  }



  // Вкладка ПРОФИЛЬ
  const renderProfile = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div className="hero softShadow">
        <Flex justify="space-between" align="flex-start" wrap="wrap" gap={12}>
          <Space size={14} align="start">
            <Avatar
              size={150}
              src={avatarUser}
              icon={<UserOutlined />}
              style={{ background: token.colorPrimary }}
            />
            <div>
              <Space align="center" wrap>
                <Title level={2} style={{ margin: 0 }}>
                  {headline}
                </Title>
                {bestBadge}
              </Space>
              <div style={{ marginTop: 10 }}>
                <Text type="secondary">{subline}</Text>
                <Space style={{ marginTop: 5 }} wrap>
                  <Tag icon={<SafetyCertificateOutlined />} color="green">
                    Самый чистый код в вашей жизни
                  </Tag>
                  <Tag icon={<FireOutlined />} color="volcano">
                    Кратчайший дедлайн
                  </Tag>
                  <Tag icon={<BulbOutlined />} color="gold">
                    Любый задачи
                  </Tag>
                  <Tag icon={<SettingOutlined />} color="blue">
                    Безопасный код
                  </Tag>
                </Space>
              </div>
            </div>
          </Space>

          <Space wrap>
            <Tooltip title="Показать портфолио">
              <Button icon={<FileTextOutlined />} onClick={openDrawer}>
                Портфолио
              </Button>
            </Tooltip>
            <Button type="primary" icon={<ThunderboltOutlined />} onClick={openHire}>
              Нанять “лучшего”
            </Button>
          </Space>
        </Flex>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className="kpiCard softShadow" title="Статистика (очень научно)">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <Statistic title="Заводов пережито" value={1} prefix={<ApartmentOutlined />} />
              <Statistic title="Компаний обанкрочено" value={2} prefix={<SettingOutlined />} />
              <Statistic title="Кейсов выполненно" value={125} prefix={<ToolOutlined />} />
              <Divider style={{ margin: '8px 0' }} />
              <Text type="secondary">Уровень “самый лучший”:</Text>
              <Rate allowHalf defaultValue={5} />
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card className="kpiCard softShadow" title="Кто я, и что умею (в двух словах, на одном лендинге">
            <Descriptions column={1} size="middle" bordered>
              <Descriptions.Item label="Профессия">
                Разработчик на все стороны
              </Descriptions.Item>
              <Descriptions.Item label="Специализация">
                Сайты, лендинги, боты, конфигурции 1С, win-form приложения.
              </Descriptions.Item>
              <Descriptions.Item label="Любимая фраза клиента">
                «Да там одну страничку сверстать»
              </Descriptions.Item>
              <Descriptions.Item label="Любимая фраза программиста">
                «Сделаем»
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Профессиональность</Text>
                  <Progress percent={95} />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Скорость</Text>
                  <Progress percent={70} status="active" />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card size="small" className="softShadow">
                  <Text type="secondary">Концетрация</Text>
                  <Progress percent={100} status="success" />
                </Card>
              </Col>
            </Row>

            <Divider />

            <Alert
              type="info"
              showIcon
              icon={<CoffeeOutlined />}
              message="Важно!"
              description="Повышенная ставка ускоряет разработку на 17%. Научно не доказано, но на практике — железно."
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )


  // Вкладка ОПЫТ
  const renderExperience = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="softShadow" title="Опыт: заводы, цеха, легенды">
        <Paragraph style={{ marginTop: 0 }}>
          Работал на заводе — там, где воздух пахнет металлом, а слова “быстренько подключи” звучат как вызов.
        </Paragraph>

        <Timeline
          mode="left"
          items={[
            {
              label: '05.2023–06.2023',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Челябинский цинковый завод АО</Text>
                  <Text type="secondary">Развертывание проекта, настройка зависимостей.</Text>
                  <Tag color="gold" icon={<BulbOutlined />}>
                    devOps
                  </Tag>
                </Space>
              ),
            },
            {
              label: '05.2024–06.2024',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>1C Автоматизация бизнеса</Text>
                  <Text type="secondary">Разработка прикладного решения для автоматизации производственных задач предприятия.</Text>
                  <Tag color="blue" icon={<SettingOutlined />}>
                    1C-разработчик
                  </Tag>
                </Space>
              ),
            },
            {
              label: '06.2024–06.2025',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Армия России</Text>
                  <Text type="secondary">Выполнял функцию раба</Text>
                  <Tag color="volcano" icon={<ThunderboltOutlined />}>
                    Специалист по отчетам / учету / физ.подготовке
                  </Tag>
                </Space>
              ),
            },
            {
              label: '06.2025-н.в.',
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Свободный разработчик (уровень: legendary)</Text>
                  <Text type="secondary">Любые задачи: от “одна страница” до “взломай Пентагон”.</Text>
                  <Tag color="green" icon={<TrophyOutlined />}>
                    Репутация: держится на ките и двух слонах
                  </Tag>
                </Space>
              ),
            },
          ]}
        />
      </Card>

      <Card className="softShadow" title="Как обычно идёт работа">
        <Steps
          current={2}
          items={[
            { title: 'ТЗ', description: 'Изучаю тех. задание, уточняю каждую мелочь' },
            { title: 'Прототип', description: 'Разработка прототипа' },
            { title: 'Кодинг', description: 'Делаю как надо, а не как “дед учил”' },
            { title: 'Сдача', description: 'Проверка, правки, деньги' },
          ]}
        />
      </Card>
    </Space>
  )

  
  // Вкладка НАВЫКИ
  const renderSkills = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={10}>
          <Card className="softShadow" title="Скиллы (без скромности, но с юмором)">
            <List
              bordered
              dataSource={[
                { title: 'Backend', icon: <SettingOutlined /> },
                { title: 'Frontend', icon: <SafetyCertificateOutlined /> },
                { title: 'Базы данных', icon: <BulbOutlined /> },
                { title: '1С Преприятие', icon: <FundOutlined /> },
                { title: 'НейронОчки (куда без них)', icon: <ToolOutlined /> },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    {item.icon}
                    <Text>{item.title}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <Divider />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text type="secondary">Самооценка (строго по приборам)</Text>
              <Progress percent={15} status="exception" />
              <Text type="secondary">Умение сохранять спокойствие</Text>
              <Progress percent={99} />
              <Text type="secondary">Умение шутить над другими</Text>
              <Progress percent={100} status="success" />
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card className="softShadow" title="Частые вопросы (и ответы)">
            <Collapse
              accordion
              items={[
                {
                  key: '1',
                  label: 'Сделаешь “по-быстрому”?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      Конечно. Пару костылей и готово.
                    </Paragraph>
                  ),
                },
                {
                  key: '2',
                  label: 'Можешь кодить без нейронок?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      Можно, а зачем?
                    </Paragraph>
                  ),
                },
                {
                  key: '3',
                  label: 'Почему дорого?',
                  children: (
                    <Paragraph style={{ margin: 0 }}>
                      Потому что “дёшево” обычно заканчивается вторым визитом. А у меня — сразу нормально.
                    </Paragraph>
                  ),
                },
              ]}
            />

            <Divider />

            <Tabs
              defaultActiveKey="a"
              items={[
                {
                  key: 'a',
                  label: 'Инструменты',
                  children: (
                    <Space direction="vertical" size={10} style={{ width: '100%' }}>
                      <Alert
                        type="success"
                        showIcon
                        message="Набор мастера"
                        description="Интернет, ноутбук и банка энергетика."
                      />
                      <Alert
                        type="warning"
                        showIcon
                        message="Запрещённый артефакт"
                        description="Теория и терминология. Это, то самое и всякое."
                      />
                    </Space>
                  ),
                },
                {
                  key: 'b',
                  label: 'Принципы',
                  children: (
                    <Space direction="vertical" size={8}>
                      <Tag color="green">Безопасность</Tag>
                      <Tag color="blue">Порядок</Tag>
                      <Tag color="gold">Красиво</Tag>
                      <Tag color="volcano">Быстро (если не мешают)</Tag>
                    </Space>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card className="softShadow" title="Дополнительные ссылочки на работы">
        <Carousel autoplay>
          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Title level={4} style={{ marginTop: 0 }}>Ещё одно портфолио на чистом React</Title>
              <a href="https://8cofiman.github.io" target="_blank" rel="noopener noreferrer">
                ТЫК сюда
              </a>
              <Divider />
              <Space wrap>
                <Tag color="volcano">react</Tag>
                <Tag color="volcano">адаптивность</Tag>
                <Tag color="volcano">стильно</Tag>
              </Space>
            </Card>
          </div>
          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Title level={4} style={{ marginTop: 0 }}>Чисто красивая верстка</Title>
              <a href="https://8cofiman.github.io/Woodtech" target="_blank" rel="noopener noreferrer">
                ТЫК сюда
              </a>
              <Divider />
              <Space wrap>
                <Tag color="green">html</Tag>
                <Tag color="green">css</Tag>
                <Tag color="green">67</Tag>
              </Space>
            </Card>
          </div>
          <div>
            <Card className="softShadow" style={{ borderRadius: 18 }}>
              <Title level={4} style={{ marginTop: 0 }}>Канбан-доска</Title>
              <a href="https://8cofiman.github.io/KanbanBoard_v2" target="_blank" rel="noopener noreferrer">
                ТЫК сюда
              </a>
              <Divider />
              <Space wrap>
                <Tag color="blue">можно юзать</Tag>
                <Tag color="gold">адаптивность</Tag>
                <Tag color="purple">js</Tag>
              </Space>
            </Card>
          </div>
        </Carousel>
      </Card>
    </Space>
  )

  
  // Вкладка КОНТАКТЫ
  const renderContact = () => (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Card className="softShadow" title="Связаться со мной (пранк заявка)">
        {!submitted ? (
          <>
            <Alert
              type="warning"
              showIcon
              message="Внимание"
              description="Если скажете “там всего на 1 страничка” — форма автоматически добавит СРОЧНО."
              icon={<ThunderboltOutlined />}
              style={{ marginBottom: 16 }}
            />

            <Form
              layout="vertical"
              onFinish={onSubmitContact}
              initialValues={{
                urgency: 'Обычно',
                scope: 'Лендинг',
              }}
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Ваше имя"
                    rules={[{ required: true, message: 'Введите имя' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Например: Пашка" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[
                      { required: true, message: 'Введите телефон' },
                      { min: 7, message: 'Ну ты чего, коротковато 🙂' },
                    ]}
                  >
                    <Input prefix={<CustomerServiceOutlined />} placeholder="+7..." />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="task"
                label="Что нужно сделать"
                rules={[{ required: true, message: 'Опишите задачу' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Например: разработать лендинг для автомойки..."
                />
              </Form.Item>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item name="urgency" label="Срочность">
                    <Segmented
                      options={['Обычно', 'Срочно', 'Вчера']}
                      onChange={(v) => {
                        if (v === 'Вчера') {
                          msgApi.warning('Режим “Вчера” активирован: готовлю плащ супергероя.')
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="scope" label="Тип работ">
                    <Segmented options={['Сайт', 'Лендинг', 'Конфигурация', 'Win-form', 'ТГ-бот', 'ВК-мини-апп']} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="comment" label="Комментарий (необязательно)">
                <Input placeholder="Например: платим х2" />
              </Form.Item>

              <Space wrap>
                <Button type="primary" htmlType="submit" icon={<ThunderboltOutlined />}>
                  Отправить заявку
                </Button>
                <Button onClick={openHire} icon={<TrophyOutlined />}>
                  Открыть “Нанять лучшего”
                </Button>
                <Button onClick={openDrawer} icon={<FileTextOutlined />}>
                  Портфолио
                </Button>
              </Space>
            </Form>
          </>
        ) : (
          <Result
            status="success"
            title="Голубь с заявкой улетел, ожидайте!"
            subTitle="Если что — я на связи."
            extra={[
              <Button
                key="again"
                onClick={() => {
                  setSubmitted(false)
                  msgApi.info('Ок! Можно ещё одну — и сделаем ещё лучше.')
                }}
              >
                Отправить ещё одну
              </Button>,
              <Button key="hire" type="primary" onClick={openHire} icon={<ThunderboltOutlined />}>
                Нанять “лучшего”
              </Button>,
            ]}
          />
        )}
      </Card>
    </Space>
  )

  const content = (() => {
    switch (selected) {
      case 'profile':
        return renderProfile()
      case 'experience':
        return renderExperience()
      case 'skills':
        return renderSkills()
      case 'contact':
        return renderContact()
      default:
        return renderProfile()
    }
  })()

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 16,
          colorPrimary: '#1677ff',
        },
      }}
    >
      {contextHolder}
      {msgContextHolder}

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={260}
          style={{
            background: token.colorBgContainer,
            borderRight: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div style={{ padding: 16 }}>
            <Space>
              <Avatar style={{ background: token.colorPrimary }} icon={<ThunderboltOutlined />} />
              {!collapsed && (
                <div>
                  <Text strong>Разработчик PRO</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Легенда
                  </Text>
                </div>
              )}
            </Space>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[selected]}
            items={menuItems}
            onClick={(e) => setSelected(e.key as MenuKey)}
            style={{ borderRight: 0 }}
          />
          {!collapsed ? (
            <div style={{ padding: 16 }}>
            <Card size="small" className="softShadow" style={{ borderRadius: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }} size={8}>
                <Text type="secondary">Текущая миссия</Text>
                <Text strong>Что-то как-то сделать</Text>
                <Progress percent={90} size="small" status="active" />
              </Space>
            </Card>
          </div>
          ): <></>}
          
        </Sider>

        <Layout>
          <Header
            style={{
              background: token.colorBgContainer,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              padding: '0 16px',
            }}
          >
            <Flex align="center" justify="space-between">
              <Space align="center" wrap>
                <Title level={4} style={{ margin: 0 }}>
                  Визитка Павла Христенко
                </Title>
                <Tag icon={<CrownOutlined />} color="purple">
                  “Рекомендуют 9 из 10 стоматологов”
                </Tag>
              </Space>

              <Space wrap>
                <Button onClick={openDrawer} icon={<FileTextOutlined />}>
                  Портфолио
                </Button>
                <Button type="primary" onClick={openHire} icon={<ThunderboltOutlined />}>
                  Нанять
                </Button>
              </Space>
            </Flex>
          </Header>

          <Content style={{ padding: 16 }}>
            <div style={{ maxWidth: 1180, margin: '0 auto' }}>{content}</div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <Text type="secondary">
              “Все права защищены, это не диплом.”
            </Text>
          </Footer>
        </Layout>

        <Drawer
          title="Портфолио"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          width={520}
        >
          <Tabs
            defaultActiveKey="certs"
            items={[
              {
                key: 'certs',
                label: 'Сертификаты',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    <Alert
                      type="success"
                      showIcon
                      message="Сертификат: “Middle-разработчик”"
                      description="Подтверждено опытом, заводом и здравым смыслом."
                      icon={<SafetyCertificateOutlined />}
                    />
                    <Alert
                      type="info"
                      showIcon
                      message="Сертификат: “Не делаю плохо”"
                      description="Честно."
                    />
                    <Alert
                      type="warning"
                      showIcon
                      message="Сертификат: “Клиент всегда прав”"
                      description="…пока не доходит до абсурда."
                    />
                  </Space>
                ),
              },
              {
                key: 'reviews',
                label: 'Отзывы',
                children: (
                  <List
                    itemLayout="vertical"
                    dataSource={[
                      {
                        title: 'Мой друг',
                        text: '“У него самый чистый код, он перфекционист.”',
                      },
                      {
                        title: 'Начальник завода',
                        text: '“Сказал ‘сейчас прозвоню’ — и реально перезвонил.”',
                      },
                      {
                        title: 'Клиент',
                        text: 'Сделал всё без правок.',
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={
                            <Space>
                              <Text strong>{item.title}</Text>
                              <Tag color="green" icon={<TrophyOutlined />}>
                                5/5
                              </Tag>
                            </Space>
                          }
                          description={item.text}
                        />
                      </List.Item>
                    )}
                  />
                ),
              },
              {
                key: 'extras',
                label: 'Дополнительно',
                children: (
                  <Space direction="vertical" style={{ width: '100%' }} size={12}>
                    <Card className="softShadow" style={{ borderRadius: 16 }} title="Чек-лист качества">
                      <Space direction="vertical" style={{ width: '100%' }} size={10}>
                        <Space>
                          <Badge status="success" />
                          <Text>Прописанное тех. задание</Text>
                        </Space>
                        <Space>
                          <Badge status="success" />
                          <Text>Четкое понимание того, что требуется</Text>
                        </Space>
                        <Space>
                          <Badge status="success" />
                          <Text>Правки после работ</Text>
                        </Space>
                        <Space>
                          <Badge status="processing" />
                          <Text>Энергетик/кофе (опционально, но желательно)</Text>
                        </Space>
                      </Space>
                    </Card>

                    <Card className="softShadow" style={{ borderRadius: 16 }} title="Мотивация">
                      <Paragraph style={{ marginTop: 0 }}>
                        Я не просто пишу код. Я возвращаю людям веру в программистов.
                      </Paragraph>
                    </Card>
                  </Space>
                ),
              },
            ]}
          />
        </Drawer>

        <Modal
          title="Нанять “самого лучшего”"
          open={hireModalOpen}
          onCancel={() => setHireModalOpen(false)}
          onOk={() => {
            setHireModalOpen(false)
            api.success({
              message: 'Сделка века почти заключена',
              description: 'Дальше только согласовать ТЗ, выпить энергосик и сделать идеально.',
              placement: 'topRight',
              icon: <CrownOutlined />,
            })
          }}
          okText="Забронировать разработчика"
          cancelText="Подумаю ещё"
        >
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Alert
              type="info"
              showIcon
              message="Сразу по-честному"
              description="Если нужно “дёшево и быстро” — я сделаю “быстро и норм”."
            />
            <Card className="softShadow" style={{ borderRadius: 16 }}>
              <Space direction="vertical" size={6} style={{ width: '100%' }}>
                <Text type="secondary">Пакет услуг</Text>
                <Space wrap>
                  <Tag color="blue">Разработка back</Tag>
                  <Tag color="green">Разработка front</Tag>
                  <Tag color="gold">Сборка и настройка зависимостей</Tag>
                  <Tag color="purple">Помочь с хостингом</Tag>
                </Space>
                <Divider style={{ margin: '10px 0' }} />
                <Text type="secondary">Уровень уверенности</Text>
                <Rate defaultValue={5} />
                <Text type="secondary">
                  *В редких случаях уверенность падает. Возраст всё таки...
                </Text>
              </Space>
            </Card>
          </Space>
        </Modal>
      </Layout>
    </ConfigProvider>
  )
}

export default App

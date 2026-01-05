import {
  ClearOutlined,
  ForkOutlined,
  InboxOutlined,
  ReloadOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { isNotBlank } from "@lichens-innovation/ts-common";
import { Button, Col, Input, Row, Select, Space, Switch, Tooltip, Typography } from "antd";
import { createStyles } from "antd-style";

import { useResponsive } from "~/hooks/use-responsive";

import {
  DEFAULT_FILTER,
  DEFAULT_LANGUAGE,
  DEFAULT_SHOW_ARCHIVED,
  DEFAULT_SHOW_FORKS,
  SORT_FIELD_OPTIONS,
} from "./github-user-projects.constants";
import { useGithubUserProjectsStore } from "./github-user-projects.store";
import type { GithubUserProject } from "./github-user-projects.types";
import { buildLanguageOptions } from "./github-user-projects.utils";

const { Text } = Typography;

interface GithubUserProjectsToolbarProps {
  projects: GithubUserProject[];
  filteredCount: number;
  isLoading: boolean;
  isFetching: boolean;
  onSearch: () => void;
  onRefresh: () => void;
}

export const GithubUserProjectsToolbar = ({
  projects,
  filteredCount,
  isLoading,
  isFetching,
  onSearch,
  onRefresh,
}: GithubUserProjectsToolbarProps) => {
  const { styles } = useStyles();
  const { isDesktop, isMobile } = useResponsive();

  const {
    username,
    filter,
    language,
    showForks,
    showArchived,
    sortField,
    sortOrder,
    setUsername,
    setFilter,
    setLanguage,
    setShowForks,
    setShowArchived,
    setSortField,
    toggleSortOrder,
    resetFilters,
  } = useGithubUserProjectsStore();

  const languageOptions = buildLanguageOptions(projects);
  const hasProjects = projects.length > 0;
  const hasFilters =
    filter !== DEFAULT_FILTER ||
    language !== DEFAULT_LANGUAGE ||
    showForks !== DEFAULT_SHOW_FORKS ||
    showArchived !== DEFAULT_SHOW_ARCHIVED;

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isNotBlank(username)) {
      onSearch();
    }
  };

  return (
    <div className={styles.toolbar}>
      {/* Search row */}
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={16} md={12} lg={10}>
          <Input
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter GitHub username..."
            prefix={<SearchOutlined />}
            autoFocus={isDesktop}
            allowClear
            className={styles.usernameInput}
          />
        </Col>

        <Col xs={24} sm={8} md={6} lg={4}>
          <Space size="small" className={styles.searchActions}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={onSearch}
              loading={isLoading}
              disabled={!isNotBlank(username)}
            >
              {isMobile ? "" : "Search"}
            </Button>

            {hasProjects && (
              <Tooltip title="Refresh data">
                <Button
                  icon={<ReloadOutlined spin={isFetching && !isLoading} />}
                  onClick={onRefresh}
                  disabled={isFetching}
                />
              </Tooltip>
            )}
          </Space>
        </Col>

        {hasProjects && (
          <Col xs={12} sm={8} md={6} lg={4}>
            <Text type="secondary" className={styles.count}>
              {filteredCount} / {projects.length} repos
            </Text>
          </Col>
        )}
      </Row>

      {/* Filters row (only show when we have projects) */}
      {hasProjects && (
        <Row gutter={[12, 12]} align="middle" className={styles.filtersRow}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by name, description..."
              prefix={<SearchOutlined />}
              allowClear
              className={styles.filterInput}
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Select
              value={language}
              onChange={setLanguage}
              options={languageOptions}
              className={styles.select}
              placeholder="Language"
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Select
              value={sortField}
              onChange={setSortField}
              options={SORT_FIELD_OPTIONS}
              className={styles.select}
            />
          </Col>

          <Col xs={6} sm={4} md={2} lg={2}>
            <Tooltip title={sortOrder === "asc" ? "Ascending" : "Descending"}>
              <Button
                icon={sortOrder === "asc" ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                onClick={toggleSortOrder}
                className={styles.sortButton}
              />
            </Tooltip>
          </Col>

          {!isMobile && (
            <>
              <Col xs={6} sm={4} md={3} lg={2}>
                <Tooltip title="Show forked repositories">
                  <Space size={4} className={styles.switchItem}>
                    <Switch
                      size="small"
                      checked={showForks}
                      onChange={setShowForks}
                    />
                    <ForkOutlined />
                  </Space>
                </Tooltip>
              </Col>

              <Col xs={6} sm={4} md={3} lg={2}>
                <Tooltip title="Show archived repositories">
                  <Space size={4} className={styles.switchItem}>
                    <Switch
                      size="small"
                      checked={showArchived}
                      onChange={setShowArchived}
                    />
                    <InboxOutlined />
                  </Space>
                </Tooltip>
              </Col>
            </>
          )}

          {hasFilters && (
            <Col xs={6} sm={4} md={3} lg={2}>
              <Tooltip title="Clear all filters">
                <Button icon={<ClearOutlined />} onClick={resetFilters} size="small">
                  {!isMobile && "Clear"}
                </Button>
              </Tooltip>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

const useStyles = createStyles(({ token }) => ({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },
  usernameInput: {
    width: "100%",
  },
  searchActions: {
    display: "flex",
  },
  count: {
    fontFamily: "monospace",
    fontSize: 13,
  },
  filtersRow: {
    paddingTop: 8,
    borderTop: `1px solid ${token.colorBorderSecondary}`,
  },
  filterInput: {
    width: "100%",
  },
  select: {
    width: "100%",
  },
  sortButton: {
    width: "100%",
  },
  switchItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
}));


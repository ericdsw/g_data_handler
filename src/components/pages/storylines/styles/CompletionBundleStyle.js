export const styles = () => ({
  bundleCard: {
    // background: '#463f47',
    // background: theme.palette.background.paper,
    background: props => props.bundleCardBackground,
    marginTop: 4,
  },
  descriptionText: {
    marginBottom: 16,
    fontStyle: 'italic',
  },
});

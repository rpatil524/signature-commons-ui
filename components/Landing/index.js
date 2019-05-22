import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { landingStyle } from '../../styles/jss/theme.js'


import { SearchCard, StatDiv, CountsDiv, BottomLinks } from './Misc'
import { ChartCard, Selections } from '../Admin/dashboard.js'

export default withStyles(landingStyle)(class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      input: {},
      searchType: 'metadata',
      type: 'Overlap',
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchChange = this.searchChange.bind(this)
  }

  handleChange(event, searchType) {
    if (searchType) {
      this.setState({ searchType }, ()=> {
        const element = document.getElementById('topcard')
        element.scrollIntoView({ block: 'start', inline: 'center', behavior: 'smooth' })
      })
    }
  }
  searchChange(e) {
    this.setState({ search: e.target.value })
  }


  render() {
    return (
      <div>
        <Grid container
          spacing={24}
          alignItems={'center'}
          direction={'column'}>
          <Grid item xs={12} className={this.props.classes.stretched} id='topcard'>
            <SearchCard search={this.state.search}
              searchChange={this.searchChange}
              handleChange={this.handleChange}
              type={this.state.type}
              searchType={this.state.searchType}
              submit={this.submit}
              {...this.props} />
          </Grid>
          <Grid item xs={12} className={this.props.classes.stretched}>
            <StatDiv {...this.props}/>
          </Grid>
          <Grid item xs={12}>
            <ChartCard cardheight={300} pie_stats={this.props.resource_signatures} color={'Blue'}/>
            <div className={this.props.classes.centered}>
              <Typography variant="caption">
                Signatures per Resource
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} className={this.props.classes.stretched}>
          </Grid>
          <Grid item xs={12} className={this.props.classes.stretched}>
            <CountsDiv {...this.props}/>
          </Grid>
          <Grid item xs={12}>
            <div className={this.props.classes.centered}>
              <div>
                <span className={this.props.classes.paddedText}>Examine metadata:</span>
                <Selections
                  value={this.props.selected_field}
                  values={Object.keys(this.props.piefields).sort()}
                  onChange={(e) => this.props.handleSelectField(e)}
                />
              </div>
              <ChartCard cardheight={300} pie_stats={this.props.pie_stats} color={'Blue'}/>
              <Typography variant="caption">
                Signatures per {this.props.selected_field.replace(/_/g, ' ')}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <BottomLinks handleChange={this.handleChange}
              {...this.props} />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </div>
    )
  }
})